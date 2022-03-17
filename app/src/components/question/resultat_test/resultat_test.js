import parseMD from "@/util/parse";

const diff = require("diff");

const différence = function (orig = "", modif = "", mode_affichage) {
	const différences = diff.diffChars(orig, modif);

	var résultat_ins = "";
	var résultat_del = "";

	différences.forEach((différence) => {
		if (différence.added) {
			résultat_ins += `<span class="diff différent ins ${mode_affichage ? " enabled" : ""}">${différence.value}</span>`;
		} else if (différence.removed) {
			résultat_del += `<span class="diff différent del ${mode_affichage ? " enabled" : ""}">${différence.value}</span>`;
		} else {
			résultat_ins += différence.value;
			résultat_del += différence.value;
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
	name: "ResultatTest",
	data() {
		return {
			selected: 'Tests',
			sortie_observée: null,
			sortie_attendue: null,
			params: null,
			feedback: null,
		};
	},
	props: {
		test: null,
		resultat: null,
	},
	computed: {
		mode_affichage() {
			return this.$store.state.mode_affichage;
		},
	},
	mounted() {
		this.rafraîchirSorties();
	},
	methods: {
		rafraîchirSorties: function () {
			if (!this.test) return;
			if (!this.resultat) {
				this.sortie_observée = null;
				this.sortie_attendue = this.test.sortie_attendue;
				this.feedback = null;
			} else {
				const résultats = différence(
					this.resultat.sortie_observée.toString(),
					this.test.sortie_attendue.toString(),
					this.mode_affichage,
				);
				this.sortie_observée = résultats.résultat_observé;
				this.sortie_attendue = résultats.résultat_attendu;
				this.feedback = parseMD(this.resultat.feedback);
			}
		},
	},
	watch: {
		resultat: function () {
			this.rafraîchirSorties();
		},
		test: function () {
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
