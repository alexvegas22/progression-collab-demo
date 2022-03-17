import OngletsInformation from '@/components/question/onglets_information/onglets_information.vue';
import Enonce from "@/components/question/enonce/enonce.vue";
import EditeurCode from "@/components/question/editeur/editeur.vue";
import JeuTests from "@/components/question/jeu_tests/jeu_tests.vue";
import RetroactionTentative from "@/components/question/retroaction_tentative/retroaction_tentative.vue";
import Présentation from "@/components/question/présentation/présentation.vue";
import Avancement from "@/components/question/avancement/avancement.vue";

const API_URL = process.env.VUE_APP_API_URL;

export default {
	name: "Question",
	data() {
		return {
			panneauAfficher: true,
			énoncéPleinÉcran: false,
			énoncéSemiÉcran: true,
		};
	},
	components: {
		OngletsInformation,
		Enonce,
		EditeurCode,
		JeuTests,
		RetroactionTentative,
		Présentation,
		Avancement
	},
	computed: {
		testerPanneau() {
			return this.panneauAfficher;
		},
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
			return this.$store.state.uri;
		},
		lang() {
			return this.$store.state.langageDéfaut;
		},
		démo() {
			return this.$store.state.démo;
		},
		erreurs() {
			return this.$store.state.erreurs;
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
	},
	mounted() {
		if(this.uri && this.user) this.récupérerQuestion();
	},
	provide() {
		return {
			énoncéPleinÉcran: this.énoncéPleinÉcran,
			énoncéSemiÉcran: this.énoncéSemiÉcran,
			panneauAfficher: this.panneauAfficher,
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
					})
			} else {
				this.$store
					.dispatch("postAvancement", {
						url: this.user.liens.avancements,
						question_uri: this.uri,
						avancement: {},
						lang_défaut: this.lang,
					})
			}
		},
		récupérerQuestion() {
			this.$store.dispatch("getQuestion", API_URL + "/question/" + this.uri);
		},
		ajusterÉnoncé(type) {
			if (type === 'semi') {
				this.énoncéSemiÉcran = !this.énoncéSemiÉcran;
				if (this.énoncéSemiÉcran)
					this.énoncéPleinÉcran = false;
			}
			else if (type === 'plein') {
				this.panneauAfficher = false;
				this.énoncéPleinÉcran = true;
				this.énoncéSemiÉcran = false;
			}
			else {
				this.énoncéPleinÉcran = false;
				this.énoncéSemiÉcran = false;
			}
		},
		ajusterPanneau() {
			this.panneauAfficher = !this.panneauAfficher;
			if (this.énoncéPleinÉcran && this.panneauAfficher) {
				this.énoncéPleinÉcran = false;
				this.énoncéSemiÉcran = true;
			}
		},
	},
};
