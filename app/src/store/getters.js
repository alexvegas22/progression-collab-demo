export default {
	configServeur: state => state.configServeur,
	préférences: state => state.préférences,
	locale: state => state.préférences?.locale,
	thèmeSombre: state => state.préférences?.apparence_thème == "sombre",
	erreurs: state => state.erreurs,
};
