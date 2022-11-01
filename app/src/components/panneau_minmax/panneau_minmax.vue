
<template>
	<div class="d-flex flex-column" ref="contenu" :class="{maximisé: état_max, minimisé: état_min, horizontal: !horizontal && état_min}"
	>
		<div class="d-flex"
			style=" justify-content: right;
					padding: 2px"
		>
			<i class="fa fa-window-minimize bouton" :class="{invisible: état_min}" @click="minimiser" />
			<i class="fa fa-window-restore bouton" :class="{invisible: !état_min && !état_max}" @click="restorer" />
			<i class="fa fa-window-maximize bouton" :class="{invisible: état_max}" @click="maximiser" />
		</div>
		<div :class="{invisible: état_min}" style="flex-grow: 1; min-height: 0">
			<slot/>
		</div>
	</div>
</template>


<script>
export default {
	name: "PanneauMinMax",
	props: {
		horizontal: Boolean,
		minsize: {type: [Number, String], default: 32 },
		size: {type: [Number, String] },
	},
	emits: {
		resize: 0,
	},
	data() {
		return {
			état_max: false,
			état_min: false,
			taille_originale: 0,
		};
	},
	computed: {
		minSizeNumber () {
			return parseFloat(this.minsize);
		},
		sizeNumber () {
			return parseFloat(this.size);
		}
	},

	watch: {
		size() {
			if(this.sizeNumber<=this.minSizeNumber && !this.état_min){
				this.état_min=true;
			}
			else if(this.sizeNumber>this.minSizeNumber && this.état_min){
				this.état_min=false;
			}
			else if(!this.état_min) {
				this.sauvegarderTailleOriginale();
			}
		}
	},
	methods: {
		maximiser() {
			if(!this.état_max && !this.état_min){
				this.sauvegarderTailleOriginale();
			}
			this.état_max = true;
			this.état_min = false;
		},
		minimiser() {
			if(!this.état_max && !this.état_min){
				this.sauvegarderTailleOriginale();
			}
			this.état_max = false;
			this.état_min = true;
			this.$emit("resize", 0);
		},
		restorer() {
			this.état_max = false;
			this.état_min = false;
			this.$emit("resize", this.taille_originale);
		},
		sauvegarderTailleOriginale(){
			const taille_client = this.horizontal ?
				this.$refs.contenu.clientHeight :
				this.$refs.contenu.clientWidth + 2; //Bug: https://git.dti.crosemont.quebec/progression/progression_frontend/-/issues/89
			if(taille_client>this.minSizeNumber){
				this.taille_originale = taille_client;
			}
		}
	}
};
</script>

<style scopped>
 .bouton {
     font-size: 0.6rem;
     padding: 1px;
 }

 .invisible {
     display: none;
 }
 
 .minimisé {
     height: 1rem;
 }

 .horizontal {
     width: 2rem;
 }

 .maximisé {
     background-color: inherit;
     position: absolute;
     left: 0px;
     top: 56px;
     height: calc(100% - 56px) !important;
     width: 100%;
     z-index: 999;
 }

</style>
