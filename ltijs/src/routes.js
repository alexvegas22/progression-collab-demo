const router = require('express').Router()
const axios = require( 'axios' )
const path = require('path')
const provMainDebug = require('debug')('provider:main')

// Requiring Ltijs
const lti = require('ltijs').Provider

// Grading route
router.post('/grade', async (req, res) => {
	try {
		const idtoken = res.locals.token // IdToken
		const score = req.body.grade // User numeric score sent in the body
		// Creating Grade object
		const gradeObj = {
			userId: idtoken.user,
			scoreGiven: score,
			scoreMaximum: 100,
			activityProgress: 'Completed',
			gradingProgress: 'FullyGraded'
		}

		// Selecting linetItem ID
		let lineItemId = idtoken.platformContext.endpoint.lineitem // Attempting to retrieve it from idtoken
		if (!lineItemId) {
			const response = await lti.Grade.getLineItems(idtoken, { resourceLinkId: true })
			const lineItems = response.lineItems
			if (lineItems.length === 0) {
				// Creating line item if there is none
				console.log('Creating new line item')
				const newLineItem = {
					scoreMaximum: 100,
					label: 'Grade',
					tag: 'grade',
					resourceLinkId: idtoken.platformContext.resource.id
				}
				const lineItem = await lti.Grade.createLineItem(idtoken, newLineItem)
				lineItemId = lineItem.id
			} else lineItemId = lineItems[0].id
		}

		// Sending Grade
		const responseGrade = await lti.Grade.submitScore(idtoken, lineItemId, gradeObj)
		return res.send(responseGrade)
	} catch (err) {
		console.log(err.message)
		return res.status(500).send({ err: err.message })
	}
})

// Names and Roles route
router.get('/members', async (req, res) => {
	try {
		const result = await lti.NamesAndRoles.getMembers(res.locals.token)
		if (result) return res.send(result.members)
		return res.sendStatus(500)
	} catch (err) {
		console.log(err.message)
		return res.status(500).send(err.message)
	}
})

router.post('/lti/register', async (req, res) => {
	userId = res.locals.context.contextId + "/" + res.locals.context.user

	provMainDebug("Enregistrement de l'utilisateur " + res.locals.context.user)

	uri = req.body.uri
	username = req.body.username
	password = req.body.password

	if (!username || !password || !uri )
		return res.status(400)

	provMainDebug("Création de l'utilisateur")
	authKey = await créerUserEtObtenirAuthKey( username, password )
	if(!authKey){
		return res.status(400)
	}

	provMainDebug("Login et récupération du token")
	token = await loginEtObtenirToken(username, authKey)

	if(!token){
		return res.status(401)
	}

	provMainDebug("Sauvegarde de l'utilisateur")
	const db = lti.Database
	const result = await db.Insert( null, 'user', 
									 {"userId": userId,
									  "username": username,
									  "token": token,
									  "authKey": authKey
									 } )

	provMainDebug("Redirection vers /question")
	return lti.redirect(res, process.env.URL_BASE+'/#/question', { newResource: true, query: { "ltik": res.locals.ltik, "uri": uri, "token": token } });
})

const créerUserEtObtenirAuthKey = async function( username, password ){
	provMainDebug("Requête : " + process.env.API_URL+'/inscription')
	provMainDebug("Params: username " + username + " password " + password )

	const res_tok = await axios.post(process.env.API_URL+'/inscription', { username: username, password: password })
	
	token = res_tok.data.Token ?? null
	if(!token)
		return null

	const res_key = await axios.post(process.env.API_URL+'/user/'+username+'/cles', { nom: "LTIauthKey", portée: 1 }, { headers: {"Authorization": "bearer " + token} } )
provMainDebug(JSON.stringify(res_key.data))
	return res_key.data.data.attributes.secret ?? null
}

const loginEtObtenirToken = async function( username, authKey ){
	provMainDebug("Requête : " + process.env.API_URL+'/auth')
	provMainDebug("Params: username " + username + " key_secret " + authKey )

	const res = await axios.post(process.env.API_URL+'/auth', { username: username, key_name: "LTIauthKey", key_secret: authKey })
	return res.data.Token ?? null
}


// Deep linking route
router.post('/deeplink', async (req, res) => {
	try {
		const resource = req.body

		const items = {
			type: 'ltiResourceLink',
			title: 'Ltijs Demo',
			custom: {
				name: resource.name,
				value: resource.value
			}
		}

		const form = await lti.DeepLinking.createDeepLinkingForm(res.locals.token, items, { message: 'Successfully Registered' })
		if (form) return res.send(form)
		return res.sendStatus(500)
	} catch (err) {
		console.log(err.message)
		return res.status(500).send(err.message)
	}
})

// Return available deep linking resources
router.get('/resources', async (req, res) => {
	const resources = [
		{
			name: 'Resource1',
			value: 'value1'
		},
		{
			name: 'Resource2',
			value: 'value2'
		},
		{
			name: 'Resource3',
			value: 'value3'
		}
	]
	return res.send(resources)
})

// Wildcard route to deal with redirecting to React routes
router.get('*', (req, res) => {
	provMainDebug("reg" + JSON.stringify(req.originalUrl))
	return res.sendFile(path.join(__dirname, '../public/404.html'))
})

module.exports = router
