const router = require('express').Router()
const axios = require( 'axios' )
const path = require('path')
const provMainDebug = require('debug')('provider:main')

// Requiring Ltijs
const lti = require('ltijs').Provider

router.post('/lti/register', async (req, res) => {
	userId = res.locals.context.contextId + "/" + res.locals.context.user

	provMainDebug("Enregistrement de l'utilisateur " + userId)

	uri = req.body.uri
	username = req.body.username
	password = req.body.password

	if (!username || !password || !uri ) {
		return res.status(400).send("Requête invalide")
	}

	if (req.body.creation == "1"){
		provMainDebug("Création de l'utilisateur")
		créerUserEtObtenirToken( username, password ).then(
			token => {
				obtenirEtSauvegarderAuthKey(userId, username, token )
				
				provMainDebug("Redirection vers /question")
				return lti.redirect(res, process.env.URL_BASE+'/#/question', { newResource: true, query: { "ltik": res.locals.ltik, "uri": uri, "token": token } })
			}
		).catch(
			error => {
				return res.status(403).send(error.message)
			}
		)
	}
	else {
		provMainDebug("Login et récupération du token")
		loginEtObtenirToken(username, password).then(
			token => {
				obtenirEtSauvegarderAuthKey(userId, username, token )
				
				provMainDebug("Redirection vers /question")
				return lti.redirect(res, process.env.URL_BASE+'/#/question', { newResource: true, query: { "ltik": res.locals.ltik, "uri": uri, "token": token } })
			}
		).catch(
			error => {
				return res.status(401).send(error.message)
		})
	} 
})

const obtenirEtSauvegarderAuthKey = async function( userId, username, token ) {
	provMainDebug("Obtention de la clé")

	provMainDebug("Requête : " + process.env.API_URL+'/user/'+username+'/cles')
	provMainDebug("Params: token : " + token )

	const key_name = "LTIauthKey_" + randomID()
	
	const res_key = await axios.post(process.env.API_URL+'/user/'+username+'/cles', { nom: key_name, portée: 1 }, { headers: {"Authorization": "bearer " + token} } )
	provMainDebug("Clé générée : " + JSON.stringify(res_key.data.data.attributes))
	provMainDebug("Sauvegarde de l'utilisateur")

	const db = lti.Database
	db.Replace( null, 'user', {"userId": userId},
									 {"userId": userId,
									  "username": username,
									  "token": token,
									  "authKey_nom": key_name,
									  "authKey_secret": res_key.data.data.attributes.secret
									 }
	).then(
		response => provMainDebug("Utilisateur sauvegardé : " + userId)
	).catch(
		error => {
			console.log("Erreur de sauvegarde : " + error)
		}
	)
}

const créerUserEtObtenirToken = async function( username, password ){
	provMainDebug("Requête : " + process.env.API_URL+'/inscription')
	provMainDebug("Params: username " + username + ", password : " + password )

	return axios.post(process.env.API_URL+'/inscription', { username: username, password: password }).then(
		response => {
			return response.data.Token
		}
	)
}

const créerAuthKey = async function( username, token ){
	provMainDebug("Requête : " + process.env.API_URL+'/user/'+username+'/cles')
	provMainDebug("Params: token : " + token )

	const key_name = "LTIauthKey_" + randomID()
	
	return axios.post(process.env.API_URL+'/user/'+username+'/cles', { nom: key_name, portée: 1 }, { headers: {"Authorization": "bearer " + token} } ).then(
		response => {
			return { nom: key_name, secret: response.data.attributes.secret }
		}
	)
}

const loginEtObtenirToken = async function( username, password ){
	provMainDebug("Requête : " + process.env.API_URL+'/auth')
	provMainDebug("Params: username " + username + ", password " + password )

	return axios.post(process.env.API_URL+'/auth', { username: username, password: password }).then(
		response => {
			return response.data.Token
		}
	)
}

		const randomID = function () {
	// Math.random should be unique because of its seeding algorithm.
	// Convert it to base 36 (numbers + letters), and grab the first 9 characters
	// after the decimal.
	return Math.random().toString(36).substr(2, 9);
};

// Wildcard route to deal with redirecting to React routes
router.get('*', (req, res) => {
	provMainDebug("reg" + JSON.stringify(req.originalUrl))
	return res.sendFile(path.join(__dirname, '../public/404.html'))
})

module.exports = router
