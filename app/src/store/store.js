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
		indicateursDeFonctionnalité: [],
		langageDéfaut: null,
		mode_affichage: 0,
		nbRéussitesParLangage: [],
		question: null,
		sauvegardes: [],
		tentative: null,
		thèmeSombre: false,
		token: null,
		tokenRessources : null,
		uri: null,
		user: null,
		username: null,
		raccourcis: {
			basculerÉditeur: "['alt', 'e']",
			basculerÉnoncé: "['alt', 'q']",
			basculerModeParDifférences: "['alt', 'd']",
			basculerTests: "['alt', 'l']",
			basculerThème: "['ctrl', 'alt', 's']",
			itérerOnglets: "['alt', 'w']",
			itérerTestBas: "['alt', 'arrowdown']",
			itérerTestHaut: "['alt', 'arrowup']",
			réinitialiser: "['ctrl', 'alt', 'r']",
			soumettreTentative: "['ctrl', 'enter']",
		}
	},
	getters,
	actions,
	mutations,
});
