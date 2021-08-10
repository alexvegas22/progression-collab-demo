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
		avancement() {
			return this.$store.state.avancement;
		},
		uri() {
			var urlParams = new URLSearchParams(window.location.href);
			return urlParams.get('uri');
		},
		question() {
			return this.$store.state.question;
		},
		erreurs() {
			return this.$store.state.erreurs;
		},
		user(){
			return this.$store.state.user;
		},
	},
	watch:{
		user(){
			this.récupérerAvancement();
		},
		question(){
			this.récupérerAvancement();
		}
	},
	mounted() {
		if(this.uri){
			this.$store.dispatch("getQuestion", API_URL + "/question/" + this.uri);
		}
	},
	methods: {
		récupérerAvancement(){
			if(!this.$store.state.user || !this.$store.state.question) return;
			
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
		}
	}
};
