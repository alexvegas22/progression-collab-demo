import jwt_decode from "jwt-decode";

const tokenEstValide = function (token, délai = 60) {
	let token_décodé;
	
	try {
		token_décodé = jwt_decode(token);
	} catch (e) {
		return false;
	}
	
	const temps_courant = Math.round(Date.now() / 1000);

	return temps_courant < token_décodé.expired - délai || token_décodé.expired === 0;
};

export default tokenEstValide;
