require('dotenv').config()
const axios = require( 'axios' )

const path = require('path')
const routes = require('./src/routes')
const provMainDebug = require('debug')('provider:main')
const lti = require('ltijs').Provider
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const userSchema = new mongoose.Schema({
	userId: String,   // Id de la plateforme
	username: String, // username Progression
    token: String,    // token JWT Progression
	authKey: String   // Clé d'authentification Progression
})
userSchema.index({ userId: 1}, { unique: true })

try{
	mongoose.model('user', userSchema);
} catch (err) {
	provDatabaseDebug('Model already registered. Continuing')
}

// Setup
lti.setup(process.env.LTI_KEY,
		  {
			  url: 'mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME + '?authSource=admin',
			  connection: { user: process.env.DB_USER, pass: process.env.DB_PASS }
		  },
		  {
			  appRoute: '/lti/',
			  loginRoute: '/lti/login', // Optionally, specify some of the reserved routes
			  keysetRoute: '/lti/keys', // Specifying keyset route
			  staticPath: path.join(__dirname, './public'), // Path to static files
			  cookies: {
				  secure: false, // Set secure to true if the testing platform is in a different domain and https is being used
				  sameSite: '' // Set sameSite to 'None' if the testing platform is in a different domain and https is being used
			  },
			  devMode: true // Set DevMode to true if the testing platform is in a different domain and https is not being used
		  }
)



// When receiving successful LTI launch redirects to app
lti.onConnect(async (token, req, res) => {
	provMainDebug('onConnect')
	const db = lti.Database

	const userId = res.locals.context.contextId + "/" + res.locals.context.user
	provMainDebug(`userId : ${userId}`)
	const uri = res.locals.context.custom.uri
	provMainDebug(`uri : ${uri}`)
	
	const result = await db.Get( null, 'user', {"userId": userId})

	if(result.length>1)
		return null;
	else
		user = result[0]

	if(user){
		provMainDebug('User trouvé. ' + JSON.stringify(user) )
		
		if( !user.token || !tokenEstValide(user.token) ){
			provMainDebug('Token non trouvé. ')
			if (!user.authKey){
				provMainDebug('Clé d\'authentification non trouvée. ')
				authKey = loginAndGetAuthKey(user)
				if(authKey){
					provMainDebug('Clé d\'authentification obtenue. ')
					user.authKey = authKey
					sauvegarderAuthKey(user, authKey)
				}
			}
			provMainDebug('Login via clé d\'authentification. ')
			token = await loginAndGetToken(user, user.authKey)
			
			if(token){
				provMainDebug('Token obtenu: ' + token )
				user.token = token
				sauvegarderToken( user, token )
			}
		}		
		provMainDebug('Token : ' + user.token)
		return lti.redirect(res, process.env.URL_BASE'/#/question', { newResource: true, query: { "ltik": res.locals.ltik, "uri": uri, "token": user.token } });
	}
	else{
		provMainDebug('User non trouvé.')
		//return res.sendFile(path.join(__dirname, './public/index.html'))
		return lti.redirect(res, process.env.URL_BASE'/#/question', { newResource: true, query: { "ltik": res.locals.ltik, "uri": uri, "context": res.context } } )
	}
	
})

function tokenEstValide( token ){
	return true
}

function loginAndGetAuthKey( user ){
	return null
}

function sauvegarderAuthKey( user, authKey ){
	return null
}

const loginAndGetToken = async function( user, authKey ){
	const res = await axios.post('http://rocinante.lamancha:81/auth', { username: user.username, key_name: "LTIauthKey", key_secret: authKey })
	return res.data.Token
}

function sauvegarderToken( user, token ){
	return null
}

// When receiving deep linking request redirects to deep screen
lti.onDeepLinking(async (token, req, res) => {
	return lti.redirect(res, '/deeplink', { newResource: true })
})

// Setting up routes
lti.app.use(routes)

// Setup function
const setup = async () => {
	await lti.deploy({ port: process.env.PORT })

	/**
	 * Register platform
	 */
	//
	//	await lti.registerPlatform({
	//		url: 'http://172.20.0.8:8080',
	//		name: 'Moodle local',
	//		clientId: 'oShV5G8qB6WuqHx',
	//		authenticationEndpoint: 'http://172.20.0.8:8080/mod/lti/auth.php',
	//		accesstokenEndpoint: 'http://172.20.0.8:8080/mod/lti/token.php',
	//		authConfig: { method: 'JWK_SET', key: 'http://172.20.0.8:8080/mod/lti/certs.php' }
	//	})

	await lti.registerPlatform({
		url: 'http://rocinante.lamancha:82',
		name: 'Moodle local',
		clientId: 'oShV5G8qB6WuqHx',
		authenticationEndpoint: 'http://rocinante.lamancha:82/mod/lti/auth.php',
		accesstokenEndpoint: 'http://rocinante.lamancha:82/mod/lti/token.php',
		authConfig: { method: 'JWK_SET', key: 'http://rocinante.lamancha:82/mod/lti/certs.php' }
	})

}

setup()
