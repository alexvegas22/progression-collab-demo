require('dotenv').config()
const axios = require( 'axios' )

const path = require('path')
const provMainDebug = require('debug')('provider:main')
const lti = require('ltijs').Provider
const mongoose = require('mongoose')
const routes = require('./src/routes')

mongoose.set('useCreateIndex', true)

const userSchema = new mongoose.Schema({
	userId: String,   // Id de la plateforme
	username: String, // username Progression
    token: String,    // token JWT Progression
	authKey_nom: String,   // Clé d'authentification Progression
	authKey_secret: String
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
			if (!user.authKey_nom || !user.authKey_secret){
				provMainDebug('Clé d\'authentification non trouvée. ')
				authKey = loginAndGetAuthKey(user)
				if(authKey){
					provMainDebug('Clé d\'authentification obtenue. ')
					user.authKey = authKey
					sauvegarderAuthKey(user, authKey)
				}
			}
			provMainDebug('Login via clé d\'authentification. ')
			token = await loginEtObtenirToken(user.username, user.authKey_nom, user.authKey_secret)
			
			if(token){
				provMainDebug('Token obtenu: ' + token )
				user.token = token
				sauvegarderToken( user, token )
			}
		}		
		provMainDebug('Token : ' + user.token)
		return lti.redirect(res, process.env.URL_BASE+'/#/question', { newResource: true, query: { "ltik": res.locals.ltik, "uri": uri, "token": user.token } });
	}
	else{
		provMainDebug('User non trouvé.')

		formulaire = `
        <html><body>
		Test de login :
		
		<form method="POST" action="/lti/register">
		Username :<input type="text" name="username"><br>
		Password :<input type="password" name="password"><br>
		<input type="hidden" name="ltik" value="${res.locals.ltik}">
		<input type="hidden" name="uri" value="${uri}">
		<input type="hidden" name="creation" value="0">
		<input type="submit">
		</form>
		</body>
		</html>
		`

		
		return res.send( formulaire )
		//return res.sendFile(path.join(__dirname, './public/loginform.html'))
		//return lti.redirect(res, '/loginform', { newResource: true, query: { "ltik": res.locals.ltik, "uri": uri, "context": res.context } } )
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

const loginEtObtenirToken = async function( username, authKey_nom, authKey_secret ){
	provMainDebug("Requête : " + process.env.API_URL+'/auth')
	provMainDebug("Params: username " + username + ", authKey_nom " + authKey_nom + ", authKey_secret " + authKey_secret)

	const res = await axios.post(process.env.API_URL+'/auth', { username: username, key_name: authKey_nom, key_secret: authKey_secret })
	return res.data.Token ?? null
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
