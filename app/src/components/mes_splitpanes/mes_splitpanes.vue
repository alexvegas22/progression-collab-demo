<template>
    <splitpanes ref="sp" :horizontal="h" :class="class" @resized="resized" :dbl-click-splitter=false>
		<pane :size="taille_gauche" ref="sp_g">
			<PanneauMaximisable v-if='gauche=="true"' style="height:100%" :horizontal="h" :size=taille_gauche minsize="32" @resize="resize_gauche">
				<slot name="gauche" />
			</PanneauMaximisable>
			<slot v-else name="gauche" />
		</pane>
		<pane :size="taille_droite" ref="sp_d">
			<PanneauMaximisable v-if='droite=="true"' style="height:100%" :horizontal="h" :size=taille_droite minsize="32" @resize="resize_droite">
				<slot name="droite" />
			</PanneauMaximisable>
			<slot v-else name="droite" />
		</pane>
    </splitpanes>
</template>

<script>
 import { Splitpanes, Pane } from 'splitpanes';
 import PanneauMaximisable from "@/components/panneau_maximisable/panneau_maximisable.vue";

 export default {
     name: "MesSplitpanes",
     props: {
		 gauche: String,
		 droite: String,
		 horizontal: String,
		 class: String,
     },
     components:{
		 Splitpanes,
		 Pane,
		 PanneauMaximisable
     },
     data() {
		 return {
			 taille_gauche: 500,
			 taille_droite: 500,
			 taille_minimisée: this.convertRemToPixels(2),
		 }
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
				 this.taille_gauche = this.toPct(this.taille_minimisée);
			 }
			 else if(this.toPx(sizes[0].size)<=this.taille_minimisée){
				 this.taille_gauche = this.toPct(this.taille_minimisée);
			 }
			 else {
				 this.taille_gauche = this.toPx(sizes[0].size);
				 this.taille_droite = this.toPx(sizes[1].size);
			 }
		 },
		 resize_gauche(resize) {
			 if(resize<0) return;
			 
			 if(resize==0){
				 resize=this.taille_minimisée;
			 }

			 this.taille_gauche = resize;
			 this.taille_droite = this.taille_conteneur-this.taille_gauche;
		 },
		 resize_droite(resize) {
			 if(resize<0) return;
			 
			 if(resize==0){
				 resize=this.taille_minimisée;
			 }

			 this.taille_droite = resize;
			 this.taille_gauche = this.taille_conteneur-this.taille_droite;
		 }
		 
     }
 }
</script>
