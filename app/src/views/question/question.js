import OngletsInformation from "@/components/question/onglets_information/onglets_information.vue";
import Enonce from "@/components/question/enonce/enonce.vue";
import EditeurCode from "@/components/question/editeur/editeur.vue";
import RetroactionTentative from "@/components/question/retroaction_tentative/retroaction_tentative.vue";
import Présentation from "@/components/question/présentation/présentation.vue";
import BoutonCommentaire from "@/components/question/commentaires/bouton.vue";
import PanneauCommentaire from "@/components/question/commentaires/sidebar.vue";
import Avancement from "@/components/question/avancement/avancement.vue";
import jwt_decode from "jwt-decode";


const API_URL = import.meta.env.VITE_API_URL;

export default {
	name: "Question",
	data() {
		return {
			panneauTestsAffiché: false,
			énoncéPleinÉcran: false,
			énoncéSemiÉcran: true,
			éditeurPleinÉcran: false,
			panneauCommentaireOuvert: false,
			ongletChangéRaccourci: false,
			testSélectionnéHaut: false,
			testSélectionnéBas: false,
			tentativeRéinitialisée: false,
		};
	},
	components: {
		OngletsInformation,
		Enonce,
		Avancement,
		EditeurCode,
		RetroactionTentative,
		Présentation,
		BoutonCommentaire,
		PanneauCommentaire,
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
			return this.$store.state.tentative?.resultats;
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
		thèmeSombre() {
			return this.$store.state.thèmeSombre;
		},
		indicateursDeFonctionnalitéCommentaires() {
			return this.$store.state.indicateursDeFonctionnalité["commentaires"];
		},
		raccourcis() {
			return this.$store.state.raccourcis;
		}
	},
	watch: {
		uri: function () {
			if (this.uri && this.user) this.récupérerQuestion();
		},
		user: function () {
			if (this.uri && this.user) this.récupérerQuestion();
		},
		question: function () {
			this.récupérerOuCréerAvancement();
		},
		resultats: function (){
			if (this.resultats){
				for(var index in this.resultats){
					if(!this.resultats[index]?.résultat){
						this.panneauTestsAffiché=true;
						break;
					}
				}
			}
		},
	},
	mounted() {
		this.$store.dispatch("setErreurs", null);
		this.$store.dispatch("setErreurCallback", null);
		this.traiterParamètresURL(window.location.search);
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
		traiterParamètresURL(paramètres) {
			var urlParams = new URLSearchParams(paramètres);

			if (urlParams.has("uri")) {
				this.$store.dispatch("setUri", urlParams.get("uri"));
			}

			if (urlParams.has("lang")) {
				this.$store.dispatch("setLangageDéfaut", urlParams.get("lang"));
			}

			if (urlParams.has("demo")) {
				this.$store.dispatch("setDémo", true);
			}

		},
		récupérerOuCréerAvancement() {
			if (this.$store.state.tokenRessources) {
				const tokenRessourcesDécodé = jwt_decode(this.$store.state.tokenRessources);
				const url_avancement = tokenRessourcesDécodé.ressources["url_avancement"];

				this.récupérerAvancement(url_avancement);
			}
			else{
				const username = this.user.username;
				const id_avancement = username + "/" + this.uri;
				if (id_avancement in this.user.avancements){
					this.récupérerAvancement(this.user.avancements[id_avancement].liens.self);
				}
				else{
					const avancement = this.$store.state.cb_succes ? {
						extra: JSON.stringify({
							cb_succes: this.$store.state.cb_succes,
							cb_succes_params: this.$store.state.cb_succes_params ?? ""
						})
					} : {};
					this.sauvegarderAvancement(avancement);
				}
			}
		},
		récupérerAvancement(url_avancement) {
			this.$store
				.dispatch("récupérerAvancement", {
					url: url_avancement,
					tokenRessources: this.$store.state.tokenRessources,
				}).then((avancement) => {
					if (!this.$store.state.cb_succes) {
						this.extraire_infos_callback(avancement);
					}
					else {
						this.mettre_à_jour_infos_callback(avancement);
					}
				});
		},
		extraire_infos_callback(avancement){
			if(avancement?.extra?.cb_succes){
				this.$store.dispatch("setCallbackSuccesParams", avancement.extra.cb_succes_params);
				this.$store.dispatch("setCallbackSucces", avancement.extra.cb_succes);
			}
		},
		mettre_à_jour_infos_callback(avancement){
			if (this.$store.state.cb_succes != avancement?.extra?.cb_succes ||
				this.$store.state.cb_succes_params != avancement?.extra?.cb_succes_params) {
				this.sauvegarderAvancement(avancement);
			}
		},
		sauvegarderAvancement(avancement){
			this.$store
				.dispatch("sauvegarderAvancement", {
					url: this.user.liens.avancements,
					question_uri: this.uri,
					avancement
				});
		},
		récupérerQuestion() {
			this.$store.dispatch("récupérerQuestion", API_URL + "/question/" + this.uri);
		},
		ajusterPanneauÉnoncé(dimension) {
			if (dimension === "normal") {
				this.énoncéSemiÉcran = !this.énoncéSemiÉcran;
				if (this.énoncéSemiÉcran)
					this.énoncéPleinÉcran = false;
			}
			else if (dimension === "max") {
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
		basculerPanneauÉditeur() {
			this.éditeurPleinÉcran = !this.éditeurPleinÉcran;
			this.panneauTestsAffiché = !this.éditeurPleinÉcran;
			this.énoncéPleinÉcran = false;
			this.énoncéSemiÉcran = !this.éditeurPleinÉcran;
		},
		redimensionnerÉditeur() {
			if (this.éditeurPleinÉcran) {
				if (this.énoncéPleinÉcran || this.énoncéSemiÉcran || this.panneauTestsAffiché)
					this.éditeurPleinÉcran = false;
			}
			else if (!this.énoncéPleinÉcran && !this.énoncéSemiÉcran && !this.panneauTestsAffiché) {
				this.éditeurPleinÉcran = true;
			}
		},
		basculerMenuCommentaire() {
			this.panneauCommentaireOuvert = !this.panneauCommentaireOuvert;
		},
		sélectionnerTestDuHautAvecRaccourci() {
			this.testSélectionnéHaut = !this.testSélectionnéHaut;
		},
		sélectionnerTestDuBasAvecRaccourci() {
			this.testSélectionnéBas = !this.testSélectionnéBas;
		},
		changerModeAffichageAvecRaccourci() {
			this.$store.dispatch("setChangerModeAffichageAvecRaccourci", true);
		},
		changerOngletAvecRaccourci() {
			this.ongletChangéRaccourci = !this.ongletChangéRaccourci;
		},
		basculerFormatÉnoncéAvecRaccourci() {
			if (this.énoncéPleinÉcran) {
				this.ajusterPanneauÉnoncé("caché");
			}
			else if (this.énoncéSemiÉcran) {
				this.ajusterPanneauÉnoncé("max");
			}
			else {
				this.ajusterPanneauÉnoncé("normal");
			}
		},
		réinitialiserTentativeAvecRaccourci() {
			this.tentativeRéinitialisée = !this.tentativeRéinitialisée;
		},
	},
};
