require("dotenv").config();

const provMainDebug = require("debug")("provider:main");
const lti = require("ltijs").Provider;

const récupérerMembres = async function(token){
	const context = await lti.NamesAndRoles.getMembers(token, { resourceLinkId: true, role: " http://purl.imsglobal.org/vocab/lis/v2/membership#Learner "});
	provMainDebug(context.members.length + " membres récupérés");

	const membres = new Object();

	context.members.forEach( (membre) => {
		membres[membre.user_id] = membre;
	} );
	return membres;
};

const récupérerScores = async function(token){
	const scores = await lti.Grade.getScores(token, token.platformContext.endpoint.lineitem);
	provMainDebug(scores.scores.length + " scores récupérés");

	const userScore = new Object();
	scores.scores.forEach( (score) => {
		userScore[score.userId] = score;
	});

	return userScore;
};

module.exports = {
	récupérerMembres,
	récupérerScores,
};
