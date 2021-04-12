import Enonce from "@/components/question/enonce.vue";
import EditeurCode from "@/components/question/editeur.vue";
import Avancement from "@/components/question/avancement.vue";
import JeuTests from "@/components/question/jeu_tests.vue";
import RetroactionTentative from "@/components/question/retroaction_tentative.vue";
import ValidationTentative from "@/components/question/validation_tentative.vue";

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
		question() {
			return this.$store.state.question;
		},
		afficherRetroaction() {
			return this.$store.state.afficherRetroaction;
		},
	},
	mounted() {
		this.$store.dispatch("getQuestion", API_URL + "/question/" + this.uri);
		
		if (this.$store.state.user.avancements.includes(this.$store.state.user.username + "/" + this.uri))
			this.$store.dispatch(
				"getAvancement",
				this.$store.state.user.avancements[this.$store.state.user.username + "/" + this.uri].liens.self
			);
		else {
			this.$store.dispatch(
				"getAvancement",
				API_URL + "/avancement/" + this.$store.state.user.username + "/" + this.uri
			);
		}
	},
};
