import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/mode/clike/clike";
import "codemirror/mode/shell/shell";
import "codemirror/mode/python/python";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
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
			cm: null,
			xray: this.$store.getters?.préférences?.xray && this.$store.state.indicateursDeFonctionnalité["tout_voir"],
		};
	},
	watch: {
		xray() {
			this.$store.dispatch("setPréférences", {xray: this.xray} );
			if(!this.xray){
				this.traiterZones();
			}
			else {
				//Enlève le marquage
				this.cm.setValue(this.cm.getValue());
			}
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
			};
		},
		code() {
			return this.$store.state.tentative.code;
		},
		thème(){
			return this.$store.getters.thèmeSombre?"monokai":"default";
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
			cm.on("beforeChange",  this.onBeforeChange);
			cm.on("change",  this.onChange);
			this.cm = cm;
			if(!this.xray){
				this.traiterZones();
			}
		},
		onChange( cm, changeObj ){
			this.$store.dispatch("mettreAjourCode", cm.doc.getValue());
			this.texteModifié();

			if(!this.zonesTraitées && !this.xray) {
				this.traiterZones();
				this.zonesTraitées = true;
			}

			const marks = cm.doc.findMarksAt( changeObj.from );
			if ( marks.length === 0 ) return;
			const mark = marks[0];
			if ( mark.lines.length === 0 ) return;

			// Enlève le ou les premièress espaces
			const ligne = mark.lines[0];
			if(ligne.text.indexOf("+TODO ") > 0 &&
			   ligne.text.indexOf("-TODO") > 0 ) {
				const range = mark.find();
				const matches = ligne.text.match( /(?<=\+TODO)(.+?)(?=-TODO)/ );
				if ( !matches ) return;
				const remplacement = matches[1];
				if(remplacement.trim()!="" && remplacement.trim() !== remplacement){
					cm.doc.replaceRange( remplacement.trim(), range.from, range.to );
				}
			}
		},

		onBeforeChange(cm, changeObj) {
			var markers = cm.doc.findMarksAt(changeObj.from);
			if (markers.length === 0) return;

			const mark = markers[0].find();

			// Si on a inséré un \n dans un todo en ligne
			if(mark.from.line == mark.to.line && changeObj.origin =="+input" && changeObj.text.join("") == "" ){
				changeObj.cancel();
				return;
			}

			// Si la zone marquée a été effacée
			if( mark.from.line == changeObj.from.line
			 && mark.to.line == changeObj.to.line
			 && mark.from.ch == changeObj.from.ch
			 && mark.to.ch == changeObj.to.ch
			 && changeObj.text == "" ) {
				changeObj.update( mark.from, mark.to, " " );
			}
		},

		beforeWindowUnload() {
			if (this.indicateurModifié || this.indicateurSauvegardeEnCours) return "";
		},

		traiterZones() {
			zones.cacherHorsVisible(this.cm.doc);
			zones.désactiverHorsTodo(this.cm.doc, this.$store.getters.thèmeSombre?"#272822":"white");
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
