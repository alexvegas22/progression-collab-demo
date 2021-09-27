require("dotenv").config();

const provMainDebug = require("debug")("provider:main");
const axios = require("axios");
const lti = require("ltijs").Provider;
const jwt_decode = require("jwt-decode");

const récupérerToken = async function ( userId ){
	provMainDebug("Récupération de " + userId );
	const user = await récupérerUser( userId );
	
	if (!user){
		return null;
	}
	
	if (user.token && tokenEstValide(user.token)) {
		return user.token;
	}
	else {
		provMainDebug("Token non trouvé ou invalide. ");

		if (user.authKey_nom && user.authKey_secret) {
			provMainDebug("Login via clé d'authentification. ");
			const token = await loginEtObtenirToken(user.username, user.authKey_nom, user.authKey_secret);
			if (token) {
				provMainDebug("Token obtenu: " + token);
				sauvegarderToken(user, token);
				return token;
			} else {
				provMainDebug("Token non obtenu: ");
				return null;
			}
		} else {
			provMainDebug("Clé d'authentification non trouvée. ");
			return null;
		}
	}

}

const récupérerUser = async function( userId ){
	const db = lti.Database;
	const result = await db.Get(null, "user", { userId: userId });

	if (result.length != 1){
		provMainDebug(`User ${userId} non trouvé. `);
		return null;
	}
	
	const user = result[0];
	provMainDebug("User trouvé. " + JSON.stringify(user));
	
	return user;
}

const tokenEstValide = function(token, délais = 300) {
	const token_décodé = jwt_decode(token);
	return Math.floor(Date.now() / 1000) + délais < token_décodé.expired;
}

const loginEtObtenirToken = async function (username, authKey_nom, authKey_secret) {
	provMainDebug("Requête : " + process.env.API_URL + "/auth");
	provMainDebug("Params: username " + username + ", authKey_nom " + authKey_nom + ", authKey_secret " + authKey_secret);

	const res = await axios.post(process.env.API_URL + "/auth", {
		username: username,
		key_name: authKey_nom,
		key_secret: authKey_secret,
	});
	return res.data.Token ?? null;
}

const sauvegarderToken = async function (user, token) {
	const db = lti.Database;

	db.Replace(
		null,
		"user",
		{ userId: user.userId },
		{
			userId: user.userId,
			username: user.username,
			token: token,
			authKey_nom: user.authKey_nom,
			authKey_secret: user.authKey_secret,
		},
	)
	  .then((result) => provMainDebug("Token sauvegardé"))
	  .catch((error) => provMainDebug("Erreur de sauvegarde : " + error));
}

exports.récupérerToken = récupérerToken
exports.récupérerUser = récupérerUser
