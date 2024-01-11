import SélecteurModeAffichage from "@/components/question/sélecteur_mode_affichage/sélecteur_mode_affichage.vue";
import Ampoule from "@/components/question/ampoule/ampoule.vue";
import Diptyque from "@/components/diptyque/diptyque.vue";
import FenêtreInfo from "@/components/layouts/fenetre_info.vue";
import he from "he";

import diff_worker from "@/diff_worker";

const différence = async function (orig = "", modif = "", mode_affichage) {
	return new Promise( resolve => {
		diff_worker.worker.onmessage = function( e ){
			resolve(e.data);
		};

		diff_worker.send( {
			orig: orig,
			modif: modif,
			mode: mode_affichage
		} );
	});
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
			dirty: false,
			recalcul: false,
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
		rafraîchirSorties: async function () {
			if (!this.test || !this.test.sortie_attendue && !this.test.caché)
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

			if (!this.test.caché && this.mode_affichage) {
				this.dirty = false;
				this.recalcul = true;

				var res = await différence(
					this.résultat.sortie_observée.toString(),
					this.test.sortie_attendue.toString(),
					this.mode_affichage);

				this.sortie_observée = res.résultat_observé;
				this.sortie_attendue = res.résultat_attendu;

				this.recalcul = false;
			}
			else {
				this.sortie_observée = this.résultat.sortie_observée?.toString();
				this.sortie_attendue = this.test.sortie_attendue?.toString();
			}
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
		
		async onModeChange (mode) {
			if(this.dirty) {
				await this.rafraîchirSorties();
			}
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
	watch: {
		test: function () {
			this.dirty = true;
			this.rafraîchirSorties();
		},
		résultat: function () {
			this.dirty = true;
			this.rafraîchirSorties();
		},
	},
};
