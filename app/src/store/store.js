import { createStore } from "vuex";
import { mutations } from "./mutations";
import { getCookie } from "@/util/cookie";
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
		dev: getCookie("fe_version")=="dev",
		difficultésRéussies: [],
		enChargement: 0,
		conteneurEnChargement: 0,
		envoiTentativeEnCours: false,
		authentificationEnCours:false,
		erreurs: [],
		erreur_callback: null,
		indicateursDeFonctionnalité: [],
		langageDéfaut: null,
		mode_affichage: 0,
		nbRéussitesParLangage: [],
		question: null,
		sauvegardes: [],
		tentative: null,
		testsInitiaux: [],
		thèmeSombre: false,
		token: null,
		tokenRessources : null,
		tokenScore: null,
		uri: null,
		user: null,
		username: null,
		unleash: null,
		raccourcis: {
			sauvegarde: "['ctrl', 's']",
			basculerModeParDifférences: "['alt', 'd']",
			basculerThème: "['ctrl', 'alt', 's']",
			itérerOngletsDroite: "['alt', 'tab']",
			itérerOngletsGauche: "['alt', 'shift', 'tab']",
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
