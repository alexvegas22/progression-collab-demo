import Enonce from "@/components/question/enonce/enonce.vue";
import EditeurCode from "@/components/question/editeur/editeur.vue";
import Avancement from "@/components/question/avancement/avancement.vue";
import JeuTests from "@/components/question/jeu_tests/jeu_tests.vue";
import RetroactionTentative from "@/components/question/retroaction_tentative/retroaction_tentative.vue";
import SélectionLangage from "@/components/question/sélection_langage/sélection_langage.vue";

const API_URL = process.env.VUE_APP_API_URL;

export default {
	name: "Question",
	props: ["uri", "username"],
	components: {
		Enonce,
		Avancement,
		EditeurCode,
		JeuTests,
		RetroactionTentative,
		SélectionLangage,
	},
	computed: {
		avancement() {
			return this.$store.state.avancement;
		},
		question() {
			return this.$store.state.question;
		},
		erreurs() {
			return this.$store.state.erreurs;
		},
	},
	mounted() {
		this.$store.dispatch("initialiserUriQuestion", this.uri);
		this.$store.dispatch("getQuestion", API_URL + "/question/" + this.uri);

		const id_avancement = this.$store.state.user.username + "/" + this.uri;
		if (id_avancement in this.$store.state.user.avancements) {
			this.$store.dispatch("getAvancement", this.$store.state.user.avancements[id_avancement].liens.self);
		} else {
			this.$store.dispatch("postAvancement", {
				url: this.$store.state.user.liens.avancements,
				question_uri: this.uri,
				avancement: {},
			});
		}
	},
};
