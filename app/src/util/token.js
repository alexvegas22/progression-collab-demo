import jwt_decode from "jwt-decode";

const tokenEstValide = function (token, délais = 60) {
	if (!token) return false;

	var token_décodé = null;
	try {
		token_décodé = jwt_decode(token);
		console.log(token_décodé);
		if (token_décodé.expired === undefined) return true;
	} catch (e) {
		return false;
	}

	const expiration = Math.floor(Date.now() / 1000) + délais;

	return expiration < token_décodé.expired;
};

export default tokenEstValide;
