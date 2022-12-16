import { createStore } from "vuex";
import { mutations } from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default createStore({
	state: {
		avancement: null,
		cb_auth_params: null,
		cb_auth: null,
		cb_succes_params: null,
		cb_succes: null,
		changerModeAffichageAvecRaccourci: false,
		configServeur: null,
		démo: false,
		difficultésRéussies: [],
		enChargement: false,
		envoiTentativeEnCours: false,
		erreurs: null,
		erreur_callback: null,
		indicateursDeFonctionnalité: [],
		langageDéfaut: null,
		mode_affichage: 0,
		nbRéussitesParLangage: [],
		préférences: [],
		question: null,
		sauvegardes: [],
		tentative: null,
		thèmeSombre: false,
		token: null,
		tokenRessources : null,
		uri: null,
		user: null,
		username: null,
		unleash: null,
		raccourcis: {
			basculerModeParDifférences: "['alt', 'd']",
			basculerThème: "['ctrl', 'alt', 's']",
			itérerOnglets: "['alt', 'w']",
			itérerTestBas: "['alt', 'arrowdown']",
			itérerTestHaut: "['alt', 'arrowup']",
			lancerTestUnique: "['alt', 'arrowright']",
			réinitialiser: "['ctrl', 'alt', 'r']",
			soumettreTentative: "['ctrl', 'enter']",
		},
	},
	getters,
	actions,
	mutations,
});
