import { createStore } from "vuex";
import { mutations } from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default createStore({
	state: {
		user: null,
		uri: null,
		langageDéfaut: null,
		démo: false,
		token: null,
		tokenRessources : null,
		cb_succes: null,
		cb_succes_params: null,
		cb_auth: null,
		cb_auth_params: null,
		username: null,
		question: null,
		tentative: null,
		envoiTentativeEnCours: false,
		mode_affichage: 0,
		avancement: null,
		sauvegardes: [],
		erreurs: null,
		configServeur: null,
		difficultésRéussies: [],
		thèmeSombre: false,
		nbRéussitesParLangage: [],
		changerModeAffichageAvecRaccourci: false,
		indicateursDeFonctionnalité: [],
		raccourcis: {
			basculerThème: "['ctrl', 'alt', 's']",
			soumettreTentative: "['ctrl', 'enter']",
			réinitialiser: "['ctrl', 'alt', 'r']",
			basculerÉnoncé: "['alt', 'q']",
			basculerÉditeur: "['alt', 'e']",
			basculerTests: "['alt', 'l']",
			itérerOnglets: "['alt', 'w']",
			basculerModeParDifférences: "['alt', 'd']",
			itérerTestHaut: "['alt', 'arrowup']",
			itérerTestBas: "['alt', 'arrowdown']",
		}
	},
	getters,
	actions,
	mutations,
});
