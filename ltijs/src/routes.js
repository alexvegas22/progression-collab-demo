const router = require("express").Router();
const axios = require("axios");
const path = require("path");
const provMainDebug = require("debug")("provider:main");
const services = require("./services.js");

// Requiring Ltijs
const lti = require("ltijs").Provider;

router.post("/lti/register", async (req, res) => {
	provMainDebug("/lti/register");

	const uri = req.body.uri;
	const lang = req.body.lang;
	const userId = req.body.userid;
	const username = req.body.username;
	const password = req.body.password;
	const cb_succes = req.body.cb_succes;
	const cb_succes_params = req.body.cb_succes_params;

	provMainDebug("Login utilisateur " + userId);

	if (!username || !password || !uri) {
		return res.status(400).send("Requête invalide");
	}

	const query = {
		ltik: res.locals.ltik,
		uri: uri,
		lang: lang ?? "",
		cb_succes: cb_succes,
		cb_succes_params: cb_succes_params,
	};
	
	if (req.body.creation == "1") {
		provMainDebug("Création de l'utilisateur");
		créerUserEtObtenirToken(username, password)
			.then((token) => {
				obtenirEtSauvegarderAuthKey(userId, username, token).then( () => {
					redirigerVersQuestion( res, { ...query, token: token } );
				}
				)
			})
			.catch((error) => {
				return res.status(403).send(error.message);
			});
	} else {
		provMainDebug("Login et récupération du token");
		loginEtObtenirToken(username, password)
			.then((token) => {
				obtenirEtSauvegarderAuthKey(userId, username, token).then( () => {
					redirigerVersQuestion( res, { ...query, token: token } );
				}
				)
			})
			.catch((error) => {
				return res.status(401).send(error.message);
			});
	}
});

const obtenirEtSauvegarderAuthKey = async function (userId, username, token) {
	const clé_id = "LTIauthKey_" + randomID();
	
	return obtenirAuthKey( username, token, clé_id ).then( (résultat) => {
		sauvegarderAuthKey( userId, username, token, clé_id, résultat.data.data.attributes.secret );
	} );
};

const obtenirAuthKey = function( username, token, clé_id ){
	provMainDebug("Obtention de la clé");

	return axios.post(
		process.env.API_URL + "/user/" + username + "/cles",
		{ nom: clé_id, portée: 1 },
		{ headers: { Authorization: "bearer " + token } },
	);

}

const sauvegarderAuthKey = function( userId, username, token, clé_id, clé_secret ){
	provMainDebug("Sauvegarde de l'utilisateur " + userId);

	const db = lti.Database;
	db.Replace(
		null,
		"user",
		{ userId: userId },
		{
			userId: userId,
			username: username,
			token: token,
			authKey_nom: clé_id,
			authKey_secret: clé_secret,
		},
	)
	  .then((response) => provMainDebug("Utilisateur sauvegardé."))
	  .catch((error) => {
		  provMainDebug("Erreur de sauvegarde : " + error);
	  });	
}

const redirigerVersQuestion = function( res, query ){
	provMainDebug("Redirection vers /question");

	lti.redirect(res, process.env.URL_BASE + "/#/question", {
		newResource: true,
		query,
	});
}

const créerUserEtObtenirToken = async function (username, password) {
	provMainDebug("Requête : " + process.env.API_URL + "/inscription");
	provMainDebug("Params: username " + username + ", password : " + password);

	return axios
		.post(process.env.API_URL + "/inscription", { username: username, password: password })
		.then((response) => {
			return response.data.Token;
		});
};

const créerAuthKey = async function (username, token) {
	provMainDebug("Requête : " + process.env.API_URL + "/user/" + username + "/cles");
	provMainDebug("Params: token : " + token);

	const key_name = "LTIauthKey_" + randomID();

	return axios
		.post(
			process.env.API_URL + "/user/" + username + "/cles",
			{ nom: key_name, portée: 1 },
			{ headers: { Authorization: "bearer " + token } },
		)
		.then((response) => {
			return { nom: key_name, secret: response.data.attributes.secret };
		});
};

const loginEtObtenirToken = async function (username, password) {
	provMainDebug("Requête : " + process.env.API_URL + "/auth");
	provMainDebug("Params: username " + username + ", password " + password);

	return axios
		.post(
			process.env.API_URL + "/auth",
			{ username: username, password: password }
		)
		.then((response) => {
			return response.data.Token;
		});
};

const randomID = function () {
	// Math.random should be unique because of its seeding algorithm.
	// Convert it to base 36 (numbers + letters), and grab the first 9 characters
	// after the decimal.
	return Math.random().toString(36).substr(2, 9);
};

router.post('/lti/grade', async (req, res) => {
	try {
		provMainDebug("/lti/grade");
		
		const idToken = res.locals.token

		const userId = idToken.platformId + "/" + idToken.user;
		const username = await getUsername( userId )
		const uri = req.body.uri
		const token = await services.récupérerToken( userId )
		
		const score = await récupérerScore( username, uri, token )
		
		// Note
		const gradeObj = {
			userId: idToken.user,
			scoreGiven: score,
			scoreMaximum: 100,
			activityProgress: 'Completed',
			gradingProgress: 'FullyGraded',			
		}

		// Selecting linetItem ID
		// Attempting to retrieve it from idtoken
		let lineItemId = idToken.platformContext.endpoint.lineitem
		
		if (!lineItemId) {
			const response = await lti.Grade.getLineItems(idToken, { resourceLinkId: true })
			const lineItems = response.lineItems
			if (lineItems.length === 0) {
				// Creating line item if there is none
				provMainDebug("Création d'un item de notation");
				const newLineItem = {
					scoreMaximum: 100,
					label: 'Grade',
					tag: 'grade',
					resourceLinkId: idToken.contextId
				}
				const lineItem = await lti.Grade.createLineItem(idToken, newLineItem)
				lineItemId = lineItem.id
			} else lineItemId = lineItems[0].id
		}
		
		// Envoie de la note
		const responseGrade = await lti.Grade.submitScore(idToken, lineItemId, gradeObj)
		return res.send(responseGrade)
	} catch (err) {
		provMainDebug(err)
		return res.status(500).send({ err: err.message })
	}
})

const getUsername = async function( userId ) {
	return services.récupérerUser( userId ).then( (user) => user.username );
}

const récupérerScore = async function( username, uri, token ){
	provMainDebug("Requête : " + process.env.API_URL + "/avancement" );
	provMainDebug("Params : username : " + username + ", uri : " + uri );

	const config = {
		headers: {
			Authorization: "Bearer " + token,
		},
	};

	const requête = process.env.API_URL + "/avancement/" + username + "/" + uri;

	axios.get( requête, config)
	.then( ( res ) => {
		return res.data.data.attributes.état==2 ? 100 : 0;
	} );
}

router.get("*", (req, res) => {
	return res.sendFile(path.join(__dirname, "../public/404.html"));
});

module.exports = router;
