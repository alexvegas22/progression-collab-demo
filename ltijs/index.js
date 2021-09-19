require("dotenv").config();
const axios = require("axios");

const fs = require("fs");
const path = require("path");
const provMainDebug = require("debug")("provider:main");
const lti = require("ltijs").Provider;
const mongoose = require("mongoose");
const routes = require("./src/routes");
const Mustache = require("mustache");
const jwt_decode = require("jwt-decode");

mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
	userId: String, // Id de la plateforme
	username: String, // username Progression
	token: String, // token JWT Progression
	authKey_nom: String, // Clé d'authentification Progression
	authKey_secret: String,
});
userSchema.index({ userId: 1 }, { unique: true });

try {
	mongoose.model("user", userSchema);
} catch (err) {
	provDatabaseDebug("Model already registered. Continuing");
}

// Setup
lti.setup(
	process.env.LTI_KEY,
	{
		url: "mongodb://" + process.env.DB_HOST + "/" + process.env.DB_NAME + "?authSource=admin",
		connection: { user: process.env.DB_USER, pass: process.env.DB_PASS },
	},
	{
		appRoute: "/lti/",
		loginRoute: "/lti/login", // Optionally, specify some of the reserved routes
		keysetRoute: "/lti/keys", // Specifying keyset route
		staticPath: path.join(__dirname, "./public"), // Path to static files
		cookies: {
			secure: false, // Set secure to true if the testing platform is in a different domain and https is being used
			sameSite: "", // Set sameSite to 'None' if the testing platform is in a different domain and https is being used
		},
		devMode: true, // Set DevMode to true if the testing platform is in a different domain and https is not being used
	},
);

// When receiving successful LTI launch redirects to app
lti.onConnect(async (token, req, res) => {
	provMainDebug("onConnect");
	const db = lti.Database;

	const ltik = jwt_decode(res.locals.ltik);

	const userId = ltik.platformCode + "/" + res.locals.context.context.id + "/" + res.locals.context.user;
	provMainDebug(`userId : ${userId}`);
	const uri = btoa_url(res.locals.context.custom.uri);
	provMainDebug(`uri : ${uri}`);
	const lang = res.locals.context.custom.lang;
	provMainDebug(`lang : ${lang}`);

	const result = await db.Get(null, "user", { userId: userId });

	var user = null;
	if (result.length > 1) return null;
	else user = result[0];

	token = null;
	if (user) {
		provMainDebug("User trouvé. " + JSON.stringify(user));

		token = user.token;
		if (!token || !tokenEstValide(token)) {
			provMainDebug("Token non trouvé ou invalide. ");

			if (user.authKey_nom && user.authKey_secret) {
				provMainDebug("Login via clé d'authentification. ");
				token = await loginEtObtenirToken(user.username, user.authKey_nom, user.authKey_secret);
				if (token) {
					provMainDebug("Token obtenu: " + token);
					sauvegarderToken(user, token);
				} else {
					provMainDebug("Token non obtenu: ");
				}
			} else {
				provMainDebug("Clé d'authentification non trouvée. ");
			}
		}
	}

	if (token) {
		provMainDebug("Token : " + token);
		provMainDebug("Redirection vers : " + process.env.URL_BASE + "/#/question");
		return lti.redirect(res, process.env.URL_BASE + "/#/question", {
			newResource: true,
			query: {
				ltik: res.locals.ltik,
				uri: uri,
				lang: lang ?? "",
				token: token,
			},
		});
	} else {
		provMainDebug("Redirection vers le formulaire de login");

		var formulaire = Mustache.render(fs.readFileSync(path.join(__dirname, "./templates/loginform.mst"), "utf8"), {
			ltik: res.locals.ltik,
			uri: uri,
			lang: lang ?? "",
			userid: userId,
			platform_url: ltik.platformUrl,
			cours_nom: res.locals.context.context.title,
		});

		return res.send(formulaire);
	}
});

const btoa_url = (s) =>
	btoa(unescape(encodeURIComponent(s)))
		.replace(/\//g, "_")
		.replace(/\+/g, "-")
		.replace(/=/g, "");

function tokenEstValide(token) {
	const token_décodé = jwt_decode(token);
	return Math.floor(Date.now() / 1000) < token_décodé.expired;
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
};

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
};

// When receiving deep linking request redirects to deep screen
lti.onDeepLinking(async (token, req, res) => {
	return lti.redirect(res, "/deeplink", { newResource: true });
});

// Setting up routes
lti.app.use(routes);

// Setup function
const setup = async () => {
	await lti.deploy({ port: process.env.PORT });

	/**
	 * Register platform
	 */

	await lti.registerPlatform({
		url: "http://rocinante.lamancha:82",
		name: "Moodle local",
		clientId: "oShV5G8qB6WuqHx",
		authenticationEndpoint: "http://rocinante.lamancha:82/mod/lti/auth.php",
		accesstokenEndpoint: "http://rocinante.lamancha:82/mod/lti/token.php",
		authConfig: { method: "JWK_SET", key: "http://rocinante.lamancha:82/mod/lti/certs.php" },
	});
};

setup();
