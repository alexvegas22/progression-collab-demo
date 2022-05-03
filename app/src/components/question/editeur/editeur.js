import { VCodeMirror } from "./vcodemirror";
import parseMD from "@/util/parse";

export default {
	name: "EditeurCode",
	components: {
		VCodeMirror,
	},
	data() {
		return {
			indicateurSauvegardeEnCours: false,
			indicateurModifié: false,
			sauvegardeAutomatique: null,
			xray: localStorage.getItem("xray") === "true",
		};
	},
	watch: {
		xray() {
			localStorage.setItem( "xray", this.xray );
		},
	},
	computed: {
		code() {
			return this.$store.state.tentative.code;
		},
		thème(){
			return this.$store.state.thèmeSombre?"monokai":"default";
		},
		ebauches() {
			return this.$store.state.question.ebauches ?? [];
		},
		mode() {
			return this.$store.state.tentative.langage;
		},
		rôleÉditeur() {
			return this.$store.state.user.rôle==2;
		},
		classeIndicateur() {
			return this.indicateurSauvegardeEnCours ? "en-cours" : this.indicateurModifié ? "non-sauvegardé" : "sauvegardé";
		},
		envoiEnCours() {
			return this.$store.state.envoiTentativeEnCours;
		},
		tentative() {
			let tentative = this.$store.state.tentative;

			return tentative ? new Proxy(tentative, {
				get: function (obj, prop) {
					return prop == "feedback" ? parseMD(obj[prop]) : obj[prop];
				},
			}) : null;
		},
		tentative_réussie() {
			return this.$store.state.tentative.réussi;
		},
		testsRéussisPct() {
			return (this.$store.state.tentative.tests_réussis / this.$store.state.question.tests.length) * 100;
		},
		raccourcis(){
			return this.$store.state.raccourcis;
		}
	},

	created() {
		window.onbeforeunload = this.beforeWindowUnload;
	},

	beforeUnmount() {
		this.sauvegarder();
		window.removeEventListener("beforeunload", this.beforeWindowUnload);
	},

	methods: {
		validerTentative() {
			this.$store.dispatch("soumettreTentative", {
				langage: this.$store.state.tentative.langage,
				code: this.$store.state.tentative.code,
			});
		},
		onChange( texte ){
			this.$store.dispatch("mettreAjourCode", texte);
			this.texteModifié();
		},

		beforeWindowUnload() {
			if (this.indicateurModifié || this.indicateurSauvegardeEnCours) return "";
		},

		sauvegarder() {
			if (this.indicateurModifié && !this.indicateurSauvegardeEnCours) {
				this.indicateurSauvegardeEnCours = true;
				this.indicateurModifié = false;
				this.$store.dispatch("mettreAjourSauvegarde");
			}
		},

		texteModifié() {
			if (!this.indicateurModifié || !this.sauvegardeAutomatique) {
				this.sauvegardeAutomatique = setTimeout(async () => {
					this.indicateurSauvegardeEnCours = true;
					this.indicateurModifié = false;
					await this.$store
						.dispatch("mettreAjourSauvegarde")
						.catch((erreur) => {
							console.log("ERREUR de sauvegarde : " + erreur);
							this.indicateurModifié = true;
						})
						.finally(() => {
							this.indicateurSauvegardeEnCours = false;
							this.sauvegardeAutomatique = null;
						});
				}, import.meta.env.VITE_DELAI_SAUVEGARDE);

				this.indicateurModifié = true;
			}
		},
	},
};
