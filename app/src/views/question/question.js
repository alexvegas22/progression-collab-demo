import OngletsInformation from "@/components/question/onglets_information/onglets_information.vue";
import Enonce from "@/components/question/enonce/enonce.vue";
import EditeurCode from "@/components/question/editeur/editeur.vue";
import RetroactionTentative from "@/components/question/retroaction_tentative/retroaction_tentative.vue";
import Présentation from "@/components/question/présentation/présentation.vue";
import Avancement from "@/components/question/avancement/avancement.vue";

const API_URL = process.env.VUE_APP_API_URL;

export default {
	name: "Question",
	data() {
		return {
			panneauTestsAffiché: false,
			énoncéPleinÉcran: false,
			énoncéSemiÉcran: true,
			éditeurPleinÉcran: false,
		};
	},
	components: {
		OngletsInformation,
		Enonce,
		Avancement,
		EditeurCode,
		RetroactionTentative,
		Présentation,
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
		resultats() {
			return this.$store.state.retroactionTentative?.resultats;
		},
		uri() {
			return this.$store.state.uri;
		},
		lang() {
			return this.$store.state.langageDéfaut;
		},
		démo() {
			return this.$store.state.démo;
		},
		thèmeSombre(){
			return this.$store.state.thèmeSombre;
		}
	},
	watch: {
		uri: function () {
			if (!this.question && this.uri && this.user) this.récupérerQuestion();
		},
		user: function () {
			if (!this.question && this.uri && this.user) this.récupérerQuestion();
		},
		question: function () {
			this.récupérerAvancement();
		},
		resultats: function (){
			if (this.resultats){
				for(var index in this.resultats){
					if(!this.resultats[index].résultat){
						this.panneauTestsAffiché=true;
						break;
					}
				}
			}
		}
	},
	mounted() {
		if(this.uri && this.user) this.récupérerQuestion();
	},
	provide() {
		return {
			énoncéPleinÉcran: this.énoncéPleinÉcran,
			énoncéSemiÉcran: this.énoncéSemiÉcran,
			panneauTestsAffiché: this.panneauTestsAffiché,
			éditeurPleinÉcran: this.éditeurPleinÉcran,
			avancement: this.avancement
		};
	},
	methods: {
		récupérerAvancement() {
			const id_avancement = this.user.username + "/" + this.uri;

			if (id_avancement in this.user.avancements) {
				this.$store
					.dispatch("getAvancement", {
						url: this.user.avancements[id_avancement].liens.self,
						lang_défaut: this.lang,
					});
			} else {
				this.$store
					.dispatch("postAvancement", {
						url: this.user.liens.avancements,
						question_uri: this.uri,
						avancement: {},
						lang_défaut: this.lang,
					});
			}
		},
		récupérerQuestion() {
			this.$store.dispatch("getQuestion", API_URL + "/question/" + this.uri);
		},
		ajusterPanneauÉnoncé( dimension ) {
			if ( dimension === "normal") {
				this.énoncéSemiÉcran = !this.énoncéSemiÉcran;
				if (this.énoncéSemiÉcran)
					this.énoncéPleinÉcran = false;
			}
			else if ( dimension === "max") {
				this.énoncéPleinÉcran = true;
				this.énoncéSemiÉcran = false;
			}
			else {
				this.énoncéPleinÉcran = false;
				this.énoncéSemiÉcran = false;
			}
			this.redimensionnerÉditeur();
		},
		basculerPanneauTests() {
			this.panneauTestsAffiché = !this.panneauTestsAffiché;
			if (this.énoncéPleinÉcran && this.panneauTestsAffiché) {
				this.énoncéPleinÉcran = false;
				this.énoncéSemiÉcran = true;
			}
			this.redimensionnerÉditeur();
		},
		basculerPanneauÉditeur(){
			this.éditeurPleinÉcran = !this.éditeurPleinÉcran;
			this.panneauTestsAffiché = !this.éditeurPleinÉcran;
			this.énoncéPleinÉcran = false;
			this.énoncéSemiÉcran = !this.éditeurPleinÉcran;
		},
		redimensionnerÉditeur(){
			if(this.éditeurPleinÉcran){
				if (this.énoncéPleinÉcran || this.énoncéSemiÉcran || this.panneauTestsAffiché)
					this.éditeurPleinÉcran = false;
			}
			else if(!this.énoncéPleinÉcran && !this.énoncéSemiÉcran && !this.panneauTestsAffiché){
				this.éditeurPleinÉcran = true;
			}
		},
	},
};