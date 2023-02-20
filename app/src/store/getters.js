export default {
	configServeur: state => state.configServeur,
	préférences: state => state.préférences,
	locale: state => state.préférences?.locale,
	thèmeSombre: state => state.préférences?.apparence_thème == "sombre",
	erreurs: state => state.erreurs,
	token: state => () => {
		const temps_courant = Math.round(Date.now() / 1000);
		// Retourne le token jusqu'à 10s avant son expiration
		return state.token && temps_courant < state.token.timestamp - 10 ? state.token.token : null;
	}
};
