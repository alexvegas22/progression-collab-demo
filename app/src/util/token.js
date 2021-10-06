import jwt_decode from 'jwt-decode';

const tokenEstValide = function (token, délais = 300) {
	const token_décodé = jwt_decode(token);
	return Math.floor(Date.now() / 1000) + délais < token_décodé.expired;
};

export default tokenEstValide;
