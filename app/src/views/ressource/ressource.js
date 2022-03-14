import Enonce from "@/components/question/enonce/enonce.vue";
import EditeurCode from "@/components/question/editeur/editeur.vue";
import Avancement from "@/components/question/avancement/avancement.vue";
import JeuTests from "@/components/question/jeu_tests/jeu_tests.vue";
import RetroactionTentative from "@/components/question/retroaction_tentative/retroaction_tentative.vue";
import Présentation from "@/components/question/présentation/présentation.vue";

const API_URL = process.env.VUE_APP_API_URL;

export default {
	name: "Question",
	components: {
		Enonce,
		Avancement,
		EditeurCode,
		JeuTests,
		RetroactionTentative,
		Présentation,
	},
	computed: {
		userRessource() {
			return this.$store.state.userRessource;
		},
		question() {
			return this.$store.state.question;
		},
		avancement() {
			return this.$store.state.avancement;
		},
		tentative() {
			return this.$store.state.tentative;
		},
		uriRessource() {
			return this.$store.state.uriRessource;
		},
		tokenRessource() {
			return this.$store.state.tokenRessource;
		},
		lang() {
			return this.$store.state.langageDéfaut;
		},
		erreurs() {
			return this.$store.state.erreurs;
		},
		thèmeSombre(){
			return this.$store.state.thèmeSombre;
		}
	},
	watch: {
		question: function () {
			this.récupérerAvancement();
			this.récupérerQuestion();
		},
	},
	mounted() {
		if(this.uri && this.user) this.récupérerQuestion();
	},
	methods: {
		récupérerAvancement() {
			const id_avancement = this.userRessource + "/" + this.uriRessource;
				this.$store
					.dispatch("getAvancement", {
						url: this.user.avancements[userRessource + uriRessource].liens.self,
						lang_défaut: this.lang,
						token_ressource: this.tokenRessource,
					})
		},
		récupérerQuestion() {
			this.$store.dispatch("getQuestion", API_URL + "/question/" + this.uriRessource);
		},
	},
};
