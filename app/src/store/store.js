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
		cb_succes: null,
		cb_succes_params: null,
		cb_auth: null,
		cb_auth_params: null,
		username: null,
		question: null,
		tentative: null,

		//langagesÉbauches: ["Bash","C","C++","Clojure","Go","Java","JavaScript","Perl","PHP","Powershell","Python","Ruby","Scala","TypeScript"],
		langagesSupportés: [
			{langageAffiché: "Bash", langageYML: "bash"},
			{langageAffiché: "C", langageYML: "c"},
			{langageAffiché: "C++", langageYML: "cpp"},
			{langageAffiché: "Clojure", langageYML: "clojure"},
			{langageAffiché: "Go", langageYML: "go"},
			{langageAffiché: "Java", langageYML: "java"},
			{langageAffiché: "JavaScript", langageYML: "javascript"},
			{langageAffiché: "Perl", langageYML: "perl"},
			{langageAffiché: "PHP", langageYML: "php"},
			{langageAffiché: "Powershell", langageYML: "powershell"}, 
			{langageAffiché: "Python", langageYML: "python"},
			{langageAffiché: "Ruby", langageYML: "ruby"},
			{langageAffiché: "Scala", langageYML: "scala"},
			{langageAffiché: "TypeScript", langageYML: "typescript"}],
		langageSélectionné: null,
		retroactionTentative: null,
		authentificationTentativeEnCours: false,
		envoiTentativeEnCours: false,
		mode_affichage: 0,
		avancement: null,
		sauvegardes: [],
		sauvegardesTemporaires: new Map(),
		erreurs: null,
		configServeur: null,
	},
	getters,
	actions,
	mutations,
});
