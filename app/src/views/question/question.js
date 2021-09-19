import Enonce from "@/components/question/enonce/enonce.vue";
import EditeurCode from "@/components/question/editeur/editeur.vue";
import Avancement from "@/components/question/avancement/avancement.vue";
import JeuTests from "@/components/question/jeu_tests/jeu_tests.vue";
import RetroactionTentative from "@/components/question/retroaction_tentative/retroaction_tentative.vue";

const API_URL = process.env.VUE_APP_API_URL;

export default {
	name: "Question",
	components: {
		Enonce,
		Avancement,
		EditeurCode,
		JeuTests,
		RetroactionTentative,
	},
	computed: {
		user() {
			return this.$store.state.user;
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
		uri() {
			var urlParams = new URLSearchParams(window.location.href);
			return urlParams.get("uri");
		},
		lang() {
			var urlParams = new URLSearchParams(window.location.href);
			return urlParams.get("lang");
		},
		erreurs() {
			return this.$store.state.erreurs;
		},
	},
	watch: {
		user: function () {
			this.récupérerAvancement();
		},
		question: function () {
			this.récupérerAvancement();
		},
	},
	methods: {
		récupérerAvancement() {
			if (!this.user || !this.question) return;

			const id_avancement = this.user.username + "/" + this.uri;

			if (id_avancement in this.user.avancements) {
				this.$store.dispatch("getAvancement", {
					url: this.user.avancements[id_avancement].liens.self,
					lang_défaut: this.lang,
				});
			} else {
				this.$store.dispatch("postAvancement", {
					url: this.user.liens.avancements,
					question_uri: this.uri,
					avancement: {},
					lang_défaut: this.lang,
				});
			}
		},
	},
	mounted() {
		this.$store.dispatch("getQuestion", API_URL + "/question/" + this.uri);
	},
};
