import { createStore } from "vuex";
import { mutations } from "./mutations";
import actions from "./actions";

export default createStore({
	state: {
		user: {},
		question: {},
		retroactionTentative: Object,
		msgAPIEnvoiTentative: null,
		envoiTentativeEnCours: false,
		avancement: {},
		langageTentative: null,
		codeTentative: null,
		afficherRetroaction: false,
		afficherTentative: false,
	},
	actions,
	mutations,
});
export {default} from "./store.js";
