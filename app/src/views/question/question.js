import OngletsInformation from '@/components/question/onglets_information/onglets_information.vue';
import Enonce from "@/components/question/enonce/enonce.vue";
import EditeurCode from "@/components/question/editeur/editeur.vue";
import Avancement from "@/components/question/avancement/avancement.vue";
import JeuTests from "@/components/question/jeu_tests/jeu_tests.vue";
import RetroactionTentative from "@/components/question/retroaction_tentative/retroaction_tentative.vue";
import Présentation from "@/components/question/présentation/présentation.vue";

const API_URL = process.env.VUE_APP_API_URL;

export default {
  data() {
    return {
      afficherPanneau: true,
      énoncéSemiÉcran: true,
      énoncéPleinÉcran: false,
    };
  },
	name: "Question",
	components: {
		OngletsInformation,
		Enonce,
		Avancement,
		EditeurCode,
		JeuTests,
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
      console.log(type);
      if (type === 'semi') {
        this.énoncéSemiÉcran = !this.énoncéSemiÉcran;
        if (this.énoncéSemiÉcran)
          this.énoncéPleinÉcran = false;
      }
      else if (type === 'plein') {
        this.afficherPanneau = false;
        this.énoncéPleinÉcran = true;
        this.énoncéSemiÉcran = false;
      }
      else {
        this.énoncéPleinÉcran = false;
        this.énoncéSemiÉcran = false;
      }
      console.log('semi: ' + this.énoncéSemiÉcran);
      console.log('plein: ' + this.énoncéPleinÉcran);
    },
    ajusterPanneau() {
      console.log('test');
      this.afficherPanneau = !this.afficherPanneau;
      if (this.énoncéPleinÉcran && this.afficherPanneau) {
        this.énoncéPleinÉcran = false;
        this.énoncéSemiÉcran = true;
      }
      console.log('panneau: ' + this.afficherPanneau);
    },
    éditeurPleinÉcran() {
      if (this.énoncéPleinÉcran || this.énoncéSemiÉcran || this.afficherPanneau) {
        this.énoncéSemiÉcran = false;
        this.afficherPanneau = false;
      }
      else {
        this.énoncéSemiÉcran = true;
        this.afficherPanneau = true;
      }
      this.énoncéPleinÉcra
    },

	},
};
