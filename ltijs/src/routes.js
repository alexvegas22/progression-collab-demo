const router = require("express").Router();
const axios = require("axios");
const path = require("path");
const provMainDebug = require("debug")("provider:main");
const jwt_decode = require("jwt-decode");

const lti = require("ltijs").Provider;

router.post("/lti/grade", async (req, res) => {
	try {
		provMainDebug("/lti/grade");

		const idToken = res.locals.token;

		const userId = idToken.platformId + "/" + idToken.user;
		const uri = req.body.uri;
		const token = req.body.token.jwt;

		if (!userId || !uri || !token) return res.status(400).send("Impossible de sauvegarder la note.");

		const score = await récupérerScore(uri, token);

		// Note
		const gradeObj = {
			userId: idToken.user,
			scoreGiven: score,
			scoreMaximum: 100,
			comment: token,
			activityProgress: "Completed",
			gradingProgress: "FullyGraded",
		};

		// Selecting linetItem ID
		// Attempting to retrieve it from idtoken
		let lineItemId = idToken.platformContext.endpoint.lineitem;

		if (!lineItemId) {
			const response = await lti.Grade.getLineItems(idToken, { resourceLinkId: true });
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
		return res.status(403).send({ err: err.message });
	}
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

	const requête = process.env.VITE_API_URL + "/avancement/" + username + "/" + uri;

	return axios.get(requête, config).then((res) => {
		return res.data.data.attributes.état == "réussi" ? 100 : 0;
	});
};

router.get("*", (req, res) => {
	return res.sendFile(path.join(__dirname, "../public/404.html"));
});

module.exports = router;
