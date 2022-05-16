
function copie_profonde(objet){
	return JSON.parse(JSON.stringify(objet));
}

export {copie_profonde};
