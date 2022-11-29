export default {
	configServeur: state => state.configServeur,
	préférences: state => state.user?.préférences,
	locale: state => state.user?.préférences?.locale,
	thèmeSombre: state => state.user?.préférences?.éditeur_thème == "monokai",
};
