
function copie_profonde(objet){
	return JSON.parse(JSON.stringify(objet));
}

class AuthentificationError extends Error {
	constructor(message) {
		super(message);
		this.name = this.constructor.name;
	}
}

export {copie_profonde, AuthentificationError};
