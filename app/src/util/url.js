const atob_url = ( enc ) => atob( enc
	.replace(/-/g, "+")
	.replace(/_/g, "\\"));

const btoa_url = ( uri ) => btoa( uri )
	.replace(/=/g,"")
	.replace(/\+/g,"-")
	.replace(/\//g,"_");

const obtenirUri = (entrée) => {
	const entrée_trim = entrée.trim();

	//Extrait le paramètre d'url «uri=» s'il existe
	const uri_matchs = entrée_trim.match( /uri=(.*?)(?:&|$)/ );
  	const uri = (uri_matchs == null || uri_matchs.length < 2) ? entrée_trim : uri_matchs[1];

	var entrée_décodée;
	try {
		//Décode si encodé en base64
		entrée_décodée = atob_url( uri );
	}
	catch( e ){
		// Il ne s'agit pas d'une chaîne en b64. On l'essaye telle quelle
		entrée_décodée=uri;
	}

	try{
		// Valide l'URL et le réencode en b64
		return btoa_url(new URL(entrée_décodée).toString());
	}
	catch( e ){
		return false;
	}
};

export default obtenirUri;
