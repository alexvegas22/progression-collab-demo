import SélecteurModeAffichage from "@/components/question/sélecteur_mode_affichage/sélecteur_mode_affichage.vue";
import Ampoule from "@/components/question/ampoule/ampoule.vue";
import { diffChars } from "diff";
import he from "he";
import Diptyque from "@/components/diptyque/diptyque.vue";

import {copie_profonde} from "@/util/commun.js";

const différence = function (orig = "", modif = "", mode_affichage) {
	const différences = diffChars(orig, modif);

	var résultat_ins = "";
	var résultat_del = "";

	différences.forEach((différence) => {
		const texte_encodé = he.encode(différence.value);
		
		if (différence.added) {
			résultat_ins += `<span class="diff différent ins ${mode_affichage ? " enabled" : ""}">${texte_encodé}</span>`;
		} else if (différence.removed) {
			résultat_del += `<span class="diff différent del ${mode_affichage ? " enabled" : ""}">${texte_encodé}</span>`;
		} else {
			résultat_ins += texte_encodé;
			résultat_del += texte_encodé;
		}
	});

	return {
		résultat_attendu: résultat_ins.replaceAll(
			"\n",
			`<span class="diff visuel ${mode_affichage ? " enabled" : ""}">↵\n</span>`,
		),
		résultat_observé: résultat_del.replaceAll(
			"\n",
			`<span class="diff visuel ${mode_affichage ? " enabled" : ""}">↵\n</span>`,
		),
	};
};

export default {
	components: {
		SélecteurModeAffichage,
		Ampoule,
		Diptyque,
	},
	name: "ResultatTest",
	data() {
		return {
			sortie_observée: null,
			sortie_attendue: null,
			params: null,
			feedback: null,
			testsInitiaux: [],
		};
	},
	props: {
		test: null,
		résultat: null,
		panneauAffiché: null,
		index: null
	},
	computed: {
		mode_affichage() {
			return this.$store.state.mode_affichage;
		},
		envoiEnCours() {
			return this.$store.state.envoiTentativeEnCours;
		},
	},
	mounted() {
		this.testsInitiaux =  copie_profonde(this.$store.state.question.tests);
		this.rafraîchirSorties();
	},
	methods: {
		rafraîchirSorties: function () {
			if (!this.test) return;
			if (!this.résultat) {
				this.sortie_observée = null;
				this.sortie_attendue = !this.test.sortie_cachée ? he.encode(this.test.sortie_attendue) : this.test.sortie_attendue;
				this.feedback = null;
			} else {
				var résultats;
				if (!this.test.sortie_cachée) {
					résultats = différence(
						this.résultat.sortie_observée.toString(),
						this.test.sortie_attendue.toString(),
						this.mode_affichage,
					);
				}
				else {
					résultats = {
						résultat_attendu: this.test.résultat_attendue,
						résultat_observé: this.résultat.sortie_observée.toString()
					}
				}
				this.sortie_observée = résultats.résultat_observé;
				this.sortie_attendue = résultats.résultat_attendu;
				this.feedback = this.résultat.feedback;
			}
		},
		entréePersonnalisée(){
			this.$store.dispatch("setEntréeTest",
				{
					entrée: this.test.entrée,
					index: this.index,
				}
			);
		},
		paramsPersonnalisés(){
			this.$store.dispatch("setParamsTest",
				{
					params: this.test.params,
					index: this.index,
				}
			);
		},
		réinitialiserEntréesUtilisateur(){
			this.test.entrée = this.testsInitiaux[this.index].entrée;
			this.test.params = this.testsInitiaux[this.index].params;
		},
		réinitialiserTests(){
			this.$store.dispatch("setTests", copie_profonde(this.testsInitiaux));
			this.réinitialiserEntréesUtilisateur();
		},
	},
	watch: {
		test: function () {
			this.rafraîchirSorties();
		},
		résultat: function () {
			this.rafraîchirSorties();
		},
		mode_affichage: function (mode) {
			if (mode) {
				Array.from(document.getElementsByClassName("diff différent")).forEach((item) => {
					item.classList.add("enabled");
				});
				Array.from(document.getElementsByClassName("diff visuel")).forEach((item) => {
					item.classList.add("enabled");
				});
			} else {
				Array.from(document.getElementsByClassName("diff différent")).forEach((item) => {
					item.classList.remove("enabled");
				});
				Array.from(document.getElementsByClassName("diff visuel")).forEach((item) => {
					item.classList.remove("enabled");
				});
			}
		},
		envoiEnCours: {
			deep: true,
			handler: function(){
				if(this.envoiEnCours === true){
					this.réinitialiserTests();
				}
			}
		},
	},
};
