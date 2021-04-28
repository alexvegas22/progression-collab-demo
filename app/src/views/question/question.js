import Enonce from "@/components/question/enonce/enonce.vue";
import EditeurCode from "@/components/question/editeur/editeur.vue";
import Avancement from "@/components/question/avancement/avancement.vue";
import JeuTests from "@/components/question/jeu_tests/jeu_tests.vue";
import RetroactionTentative from "@/components/question/retroaction_tentative/retroaction_tentative.vue";
import ValidationTentative from "@/components/question/validation_tentative/validation_tentative.vue";

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
		ValidationTentative,
	},
	computed: {
		avancement() {
			return this.$store.state.avancement;
		},
		question() {
			return this.$store.state.question;
		},
	},
	mounted() {
		this.$store.dispatch("getQuestion", API_URL + "/question/" + this.uri);

		if (this.$store.state.user.avancements.includes(this.$store.state.user.username + "/" + this.uri)) {
			this.$store.dispatch(
				"getAvancement",
				this.$store.state.user.avancements[this.$store.state.user.username + "/" + this.uri].liens.self
			);
		}
		else {
			const objet = {
				url: this.$store.state.user.liens.avancements,
				question_uri: this.uri
			}
			this.$store.dispatch("postAvancement", objet);
		}
	},
};
