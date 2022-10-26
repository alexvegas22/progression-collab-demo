//import { VCodeMirror } from "./vcodemirror";
import { ref } from "vue";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/mode/clike/clike";
import "codemirror/mode/shell/shell";
import "codemirror/mode/python/python";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import { Editor, EditorConfiguration } from "codemirror";
import Codemirror from "codemirror-editor-vue3";
import parseMD from "@/util/parse";
import {zones} from "./zones.js";

export default {
	name: "EditeurCode",
	components: {
		Codemirror,
	},
	data() {
		return {
			indicateurSauvegardeEnCours: false,
			indicateurModifié: false,
			sauvegardeAutomatique: null,
			zonesTraitées: false,
			xray: localStorage.getItem("xray") === "true",
		};
	},
	watch: {
		xray() {
			localStorage.setItem( "xray", this.xray );
		},
		tentative(){
			this.zonesTraitées = false;
		}
	},
	computed: {
		cmOptions() {
			return {
				mode: this.mode,
				theme: this.thème,
				lineNumbers: true,
				indentUnit: 4,
				extraKeys: { Tab: "indentAuto" },
				foldGutter: true,
				gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
				smartIndent: false,
				font: "monospace",
			}
		},
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
						
			const value = this.$store.state.tentative.langage;
		
			if (value === "java") {
				return "mode", "text/x-java";
			} else if (value === "javascript") {
				return "mode", "javascript";
			} else if (value === "kotlin") {
				return "mode", "text/x-kotlin";
			} else if (value === "typescript") {
				return "mode", "text/typescript";
			} else if (value === "python") {
				return "mode", "python";
			} else if (value === "bash") {
				return "mode", "shell";
			} else if (value === "c") {
				return "mode", "text/x-csrc";
			} else if (["cpp", "c++"].includes(value)) {
				return "mode", "text/x-c++src";
			} else {
				return "mode", value;
			}
		},
		rôleÉditeur() {
			return this.$store.state.indicateursDeFonctionnalité["tout_voir"];
		},
		classeIndicateur() {
			return this.indicateurSauvegardeEnCours ? "en-cours" : this.indicateurModifié ? "non-sauvegardé" : "sauvegardé";
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
		onReady( cm ){
			zones.cacherHorsVisible(cm.doc);
			zones.désactiverHorsTodo(cm.doc);
		},
		onChange( texte, cm ){
			this.$store.dispatch("mettreAjourCode", texte);
			this.texteModifié();

			if(!this.zonesTraitées) {
				zones.cacherHorsVisible(cm.doc);
				zones.désactiverHorsTodo(cm.doc);
				this.zonesTraitées = true;
			}
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
