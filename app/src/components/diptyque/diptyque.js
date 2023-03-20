import { Splitpanes, Pane } from "splitpanes";
import PanneauMinMax from "@/components/panneau_minmax/panneau_minmax.vue";

export default {
	name: "Diptyque",
	props: {
		gauche: String,
		droite: String,
		size_gauche: {type: [Number,String]},
		size_droite: {type: [Number,String]},
		horizontal: String,
	},
	components:{
		Splitpanes,
		Pane,
		PanneauMinMax
	},
	emits : [
		"redimensionnéGauche"
	],
	data() {
		return {
			pct_gauche: parseFloat(this.size_gauche),
			pct_droite: parseFloat(this.size_droite),
			px_gauche: this.toPx(this.pct_gauche),
			px_droite: this.toPx(this.pct_droite),
			taille_minimisée: this.convertRemToPixels(3),
		};
	},
	computed : {
		h() {
			return this.horizontal=="true";
		},
		taille_conteneur() { return this.horizontal ?
			this.$refs.sp.container.clientHeight :
			this.$refs.sp.container.clientWidth;
		}
	},
	watch : {
		px_gauche() {
			this.pct_gauche = this.toPct(this.px_gauche);
		},
		px_droite() {
			this.pct_droite = this.toPct(this.px_droite);
		}
	},
	methods : {
		convertRemToPixels(rem) {
			return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
		},
		toPx(pct){
			return pct / 100 * this.taille_conteneur;
		},
		toPct(px){
			return px / this.taille_conteneur * 100;
		},
		resized(sizes) {
			if(this.toPx(sizes[0].size)<=this.taille_minimisée){
				this.px_gauche = this.taille_minimisée;
			}
			else {
				this.px_gauche = this.toPx(sizes[0].size);
				this.px_droite = this.toPx(sizes[1].size);
			}
			this.$emit("redimensionnéGauche", sizes[0].size.toFixed(3));
		},
		resize_gauche(resize) {
			if(resize<0) return;

			if(resize==0){
				resize=this.taille_minimisée;
			}

			this.px_gauche = resize;
			this.px_droite = this.taille_conteneur-this.px_gauche;
		},
		resize_droite(resize) {
			if(resize<0) return;

			if(resize==0){
				resize=this.taille_minimisée;
			}

			this.px_droite = resize;
			this.px_gauche = this.taille_conteneur-this.px_droite;
		}
		
	}
};
