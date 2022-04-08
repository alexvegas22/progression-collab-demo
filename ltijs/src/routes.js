const router = require("express").Router();
const axios = require("axios");
const path = require("path");
const provMainDebug = require("debug")("provider:main");
const services = require("./services.js");
const jwt_decode = require("jwt-decode");

const lti = require("ltijs").Provider;

const obtenirEtSauvegarderAuthKey = async function (userId, username, token) {
	const clé_id = "LTIauthKey_" + randomID();

	return obtenirAuthKey(username, token, clé_id).then((résultat) => {
		sauvegarderAuthKey(userId, clé_id, résultat.data.data.attributes.secret);
	});
};

const obtenirAuthKey = function (username, token, clé_id) {
	provMainDebug("Obtention de la clé");

	return axios.post(
		process.env.API_URL + "/user/" + username + "/cles",
		{ nom: clé_id, portée: 1 },
		{ headers: { Authorization: "bearer " + token } },
	);
};

const sauvegarderAuthKey = function (userId, clé_id, clé_secret) {
	provMainDebug("Sauvegarde de l'utilisateur " + userId);

	const db = lti.Database;
	db.Update(
		null,
		"user",
		{ userId: userId },
		{$set : {
			authKey_nom: clé_id,
			authKey_secret: clé_secret,
		}
	},
	)
	  .then((response) => provMainDebug("Utilisateur sauvegardé."))
	  .catch((error) => {
		  provMainDebug("Erreur de sauvegarde : " + error);
	  });
};

const randomID = function () {
	/* Math.random should be unique because of its seeding algorithm.
	Convert it to base 36 (numbers + letters), and grab the first 9 characters
	after the decimal. */
	return Math.random().toString(36).substr(2, 9);
};

router.post("/lti/grade", async (req, res) => {
    try {
        provMainDebug("/lti/grade");

        const idToken = res.locals.token;

        const userId = idToken.platformId + "/" + idToken.user;
        const uri = req.body.uri;
        const token = req.body.token;

        if (!userId || !uri || !token) return res.status(400).send("Impossible de sauvegarder la note.")

        const score = await récupérerScore(uri, token);

        const tokenRessource = await récupérerTokenRessource(token, uri, "avancement");

        // Note
        const gradeObj = {
            userId: idToken.user,
            scoreGiven: score,
            scoreMaximum: 100,
            comment: tokenRessource,
            activityProgress: "Completed",
            gradingProgress: "FullyGraded",
        };

        // Selecting linetItem ID
        // Attempting to retrieve it from idtoken
        let lineItemId = idToken.platformContext.endpoint.lineitem;

        if (!lineItemId) {
            const response = await lti.Grade.getLineItems(idToken, {resourceLinkId: true});
            const lineItems = response.lineItems;
            provMainDebug("lineItem: " + idToken.platformContext.endpoint.lineitem);
            provMainDebug(lineItems);
            if (lineItems.length === 0) {
                // Creating line item if there is none
                provMainDebug("Création d'un item de notation");
                const newLineItem = {
                    scoreMaximum: 100,
                    label: "Grade",
                    tag: "grade",
                    resourceLinkId: idToken.contextId,
                };
                const lineItem = await lti.Grade.createLineItem(idToken, newLineItem);
                lineItemId = lineItem.id;
            } else lineItemId = lineItems[0].id;
        }

        // Envoie de la note
        const responseGrade = await lti.Grade.submitScore(idToken, lineItemId, gradeObj);
        return res.send(responseGrade);
    } catch (err) {
        provMainDebug(err);
        return res.status(500).send({err: err.message});
    }
});


router.post("/lti/auth", async (req, res) => {
	provMainDebug("/lti/auth");
	
	const idToken = res.locals.token;
	const userId = idToken.platformId + "/" + idToken.user;
	const username = req.body.username;
	const token = req.body.token;
	if(!token) return res.status(400).send("un token doit être fourni")
	
	var user = await services.récupérerUser(userId);
	if(!user) {
		user = {userId: userId, username: username }
		services.sauvegarderUser( user );
	}
	services.sauvegarderToken( user, token );

	obtenirEtSauvegarderAuthKey(userId, username, token).then(
		(key) => res.status(200).send("OK")
	)
	.catch( (err) => res.status(500).send(err) );
	
});

const récupérerScore = async function (uri, token) {
    provMainDebug("Requête : " + process.env.API_URL + "/avancement");
    provMainDebug("Params :  uri : " + uri);
    const username = jwt_decode(token).username;

    const config = {
        headers: {
            Authorization: "Bearer " + token,
        },
    };

    const requête = process.env.API_URL + "/avancement/" + username + "/" + uri;

    return axios.get(requête, config).then((res) => {
        return res.data.data.attributes.état == 2 ? 100 : 0;
    });
};

const récupérerTokenRessource = async function (token, uri, type_ressource) {
    const username = jwt_decode(token).username;
    const id_ressource = username + "/" + uri;
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        },
    };

    const requête = process.env.API_URL + "/token/" + username;

    const reponse = await axios.post(requête, {idRessource: id_ressource, typeRessource: type_ressource}, config);
    return reponse.data;
};


router.get("*", (req, res) => {
	return res.sendFile(path.join(__dirname, "../public/404.html"));
});

module.exports = router;
