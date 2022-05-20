import structuredClone from "@ungap/structured-clone";

function copie_profonde(objet){
	return structuredClone(objet);
}

export {copie_profonde};
