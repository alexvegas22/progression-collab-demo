export default {
	configServeur: state => state.configServeur,
	préférences: state => state.préférences,
	locale: state => state.préférences?.locale,
	thèmeSombre: state => state.préférences?.apparence_thème == "sombre",
	erreurs: state => state.erreurs,
	token: state => {
		const temps_courant = Math.round(Date.now() / 1000);
		console.log("Temps courant: " + temps_courant)
		console.log("Token timestamp: " + state.token.timestamp)
		// Retourne le token jusqu'à 10s avant son expiration
		return state.token && temps_courant < state.token.timestamp - 60 ? state.token.token : null;
	}
};
