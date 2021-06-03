import { VCodeMirror } from "./vcodemirror";

export default {
	name: "EditeurCode",
	components: {
		VCodeMirror,
	},

	data() {
		return {
			langageSélectionné: "",
			indicateurSauvegardeEnCours: false,
			indicateurModifié: false,
			sauvegardeAutomatique: null,
		};
	},

	computed: {
		code: {
			get: function () {
				return this.$store.state.tentative.code;
			},
			set: function (texte) {
				this.$store.dispatch("mettreAjourCode", texte);
				this.texteModifié();
			},
		},
		ebauches() {
			return this.$store.state.question.ebauches ?? [];
		},

		tentative() {
			return this.$store.state.tentative;
		},

		classeIndicateur() {
			return this.indicateurSauvegardeEnCours ? "en-cours" : this.indicateurModifié ? "non-sauvegardé" : "sauvegardé";
		},
		envoiEnCours() {
			return this.$store.state.envoiTentativeEnCours;
		},
		retroactionTentative() {
			let tentative = this.$store.state.retroactionTentative;

			return tentative
				? new Proxy(tentative, {
						get: function (obj, prop) {
							return prop == "feedback" ? parseMD(obj[prop]) : obj[prop];
						},
				  })
				: null;
		},
		tentative_réussie() {
			return this.$store.state.tentative.réussi;
		},
		testsRéussisPct() {
			return (this.$store.state.retroactionTentative.tests_réussis / this.$store.state.question.tests.length) * 100;
		},
	},

		created() {
			window.onbeforeunload = this.beforeWindowUnload;
	},

	mounted() {
		if (this.tentative) {
			this.langageSélectionné = this.tentative.langage;
		}
	},

	beforeUnmount() {
		this.sauvegarder();
		window.removeEventListener("beforeunload", this.beforeWindowUnload);
	},

	watch: {
		tentative: function () {
			this.langageSélectionné = this.tentative.langage;
		},
	},

	methods: {
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

		chargerEbaucheParLangage() {
			var nouveauCode = null;

			this.sauvegarder();
			if (Object.keys(this.$store.state.sauvegardes).includes(this.langageSélectionné)) {
				nouveauCode = this.$store.state.sauvegardes[this.langageSélectionné].code;
			} else if (this.$store.state.avancement.tentatives.length > 0) {
				this.$store.state.avancement.tentatives.forEach((uneTentative) => {
					if (uneTentative.langage == this.langageSélectionné) {
						nouveauCode = uneTentative.code;
						return; //break le forEach
					}
				});
			}

			if (!nouveauCode && Object.keys(this.ebauches).includes(this.langageSélectionné)) {
				nouveauCode = this.ebauches[this.langageSélectionné].code;
			}

			this.$store.dispatch("mettreAjourLangageSelectionne", this.langageSélectionné);
			this.$store.dispatch("mettreAjourCode", nouveauCode);
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
				}, process.env.VUE_APP_DELAI_SAUVEGARDE);

				this.indicateurModifié = true;
			}
		},
		validerTentative() {
			this.$store.dispatch("soumettreTentative", {
				langage: this.$store.state.tentative.langage,
				code: this.$store.state.tentative.code,
			});
		},
	},
};
