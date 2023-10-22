import SélecteurModeAffichage from "@/components/question/sélecteur_mode_affichage/sélecteur_mode_affichage.vue";
import Ampoule from "@/components/question/ampoule/ampoule.vue";
import { diffChars } from "diff";
import he from "he";
import Diptyque from "@/components/diptyque/diptyque.vue";
import FenêtreInfo from "@/components/layouts/fenetre_info.vue";

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
		FenêtreInfo
	},
	name: "ResultatTest",
	data() {
		return {
			sortie_observée: null,
			sortie_attendue: null,
			params: null,
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
		question_type() {
			return this.$store.getters.question_type;
		},
		feedback() {
			return this.résultat?.feedback;
		}
	},
	mounted() {
		this.rafraîchirSorties();
	},
	methods: {
		rafraîchirSorties: function () {
			if (!this.test || !(this.test.sortie_attendue || this.test.caché))
			{
				this.sortie_attendue = null;
				this.sortie_observée = this.résultat?.sortie_observée.toString();
				return;
			}

			if (!this.résultat) {
				this.sortie_attendue = this.test.caché ? null : he.encode(this.test.sortie_attendue.toString());
				this.sortie_observée = null;
				return;
			}

			var résultats = !this.test.caché ? différence(
				this.résultat.sortie_observée.toString(),
				this.test.sortie_attendue.toString(),
				this.mode_affichage,
			): {
				résultat_attendu: this.test.sortie_attendue?.toString(),
				résultat_observé: this.résultat.sortie_observée?.toString()
			};

			this.sortie_observée = résultats.résultat_observé;
			this.sortie_attendue = résultats.résultat_attendu;
		},
		entréesModifiées(){
			this.test.dirty=true;
			this.$store.dispatch("setTest", {
				test: { ...this.test,
					sortie_attendue: null
				},
				index: this.index,
			}
			);
			this.$store.dispatch("setRésultat", {
				résultat: null,
				index: this.index
			});
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
	},
};
