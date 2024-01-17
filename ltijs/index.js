require("dotenv").config();

const path = require("path");
const provMainDebug = require("debug")("provider:main");
const lti = require("ltijs").Provider;
const mongoose = require("mongoose");
const routes = require("./src/routes");
const services = require("./src/services.js");
const consolidate = require("consolidate");

const userSchema = new mongoose.Schema({
	userId: String, // Id de la plateforme
	username: String, // username Progression
	token: String, // token JWT Progression
	authKey_nom: String, // Clé d'authentification Progression
	authKey_secret: String,
});
userSchema.index({ userId: 1 }, { unique: true });

const platformContact = new mongoose.Schema({
	platformUrl: String,
	name: String,
	email: String
});

try {
	mongoose.model("user", userSchema);
} catch (err) {
	provMainDebug("Model userSchema already registered. Continuing");
}
try {
	mongoose.model("platformContact", platformContact);
} catch (err) {
	provMainDebug("Model platformContact already registered. Continuing");
}

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
		devMode: true, // Set DevMode to true if the testing platform is in a different domain and https is not being used,
		dynRegRoute: "/lti/register",
		dynReg:  {
			url: process.env.URL_BASE,
			name: "Progression",
			logo: process.env.URL_BASE + "/favicon.ico",
			description: "Un exerciseur conçu pour aider l'apprentissage de la programmation par la pratique",
			autoActive: true
		}
	},
);

// When receiving successful LTI launch redirects to app
lti.onConnect(async (idToken, req, res) => {
	provMainDebug("onConnect");

	const userId = idToken.platformId + "/" + idToken.user;
	provMainDebug(`userId : ${userId}`);
	const uri = btoa_url(res.locals.context.custom.uri || res.locals.context.custom.src);
	provMainDebug(`uri : ${uri}`);
	const lang = res.locals.context.custom.lang;
	provMainDebug(`lang : ${lang}`);

	const query = Object.assign(
		{
			ltik: res.locals.ltik,
			uri: uri,
			lang: lang,
			cb_succes: process.env.URL_BASE + "/lti/grade",
			cb_succes_params: JSON.stringify({
				ltik: res.locals.ltik,
			})
		},
	);

	if(res.locals.context.roles == "http://purl.imsglobal.org/vocab/lis/v2/membership#Instructor"){
		const resLocalsToken = res.locals.token;
		const membres = await services.récupérerMembres( resLocalsToken );
		const scores = await services.récupérerScores( resLocalsToken );

		Object.values(membres).forEach( membre => {
			membre["score"] = scores[membre.user_id];
			if(membre["score"]){
				membre["score"]["timestamp"] = new Date(scores[membre.user_id]["timestamp"]).toLocaleString("fr-CA");
				membre["score"]["réussite"] = scores[membre.user_id]["resultScore"]==100?"Réussi":"Débuté";
				membre["tkres"] = membre["score"]["comment"];
			}
		});

		res.render("suivi", { membres: Object.values( membres ), url: `/question?uri=${uri}&lang=${lang}`});
		res.status(200);
	}
	else{
		provMainDebug("Redirection vers : " + process.env.URL_BASE + "/question");
		lti.redirect(res, process.env.URL_BASE + "/question", {
			newResource: true,
			query: query
		});
	}
});

lti.onDynamicRegistration(async (req, res, next) => {
  try {
	  if (!req.query.openid_configuration) {
		  return res.status(400).send({ status: 400, error: 'Bad Request', details: { message: 'Missing parameter: "openid_configuration".' } });
	  }
	  if (!req.body.email || !req.body.nom ){
		  return res.render("inscription", {
			  openid_configuration: req.query.openid_configuration,
			  registration_token: req.query.registration_token });
	  }
	  const message = await lti.DynamicRegistration.register(
		  req.query.openid_configuration,
		  req.query.registration_token);

	  res.setHeader('Content-type', 'text/html');
	  res.send(message);
  } catch (err) {
	  if (err.message === 'PLATFORM_ALREADY_REGISTERED') {
		  return res.status(403).send({ status: 403, error: 'Forbidden', details: { message: 'Platform already registered.' } });
	  }
	  return res.status(500).send({ status: 500, error: 'Internal Server Error', details: { message: err.message } });
  }
});

const btoa_url = (s) =>
	  btoa(unescape(encodeURIComponent(s)))
	  .replace(/\//g, "_")
	  .replace(/\+/g, "-")
	  .replace(/=/g, "");

lti.app.use(routes);

const setup = async () => {
	const app = lti.app;
	app.engine("html", consolidate.mustache);
	app.set("view engine", "html");
	app.set("views", __dirname + "/templates");

	await lti.deploy({ port: process.env.PORT });

	try{
		const plateformes = require("./plateformes.json");
		plateformes.forEach( async (plateforme ) => {
			await lti.registerPlatform( plateforme );
		});
	}
	catch(e) {
		console.log(e);
		console.log("ERREUR: plateformes.json n'existe pas ou n'est pas en format JSON valide");
	}
};

setup();
