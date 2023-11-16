<template>
	<div ref="contenu" :class="{normal: !état_max && !état_min, maximisé: état_max, minimisé: état_min, horizontal: !horizontal && état_min, bordure: true}"
		class="full-flex column"
	>
		<div class="d-flex" style="flex-flow: row; justify-content: right">
			<div class="entête_panneau" >
				<div style="height: 1.8rem; padding-left: 3px">
					<slot name="entête"/>
				</div>
			</div>
			<div class="d-flex theme_sombre contenu" style="min-width: 2rem; padding: 0.1rem; position: absolute; height: 1.8rem"
			>

				<div :class="{invisible: état_max || état_min}" @click="minimiser" >
					<slot name="min-icon">
						<v-icon icon="mdi-square-medium-outline" :size=icon_size ></v-icon>
					</slot>
				</div>

				<div :class="{invisible: !état_max}" @click="restorer" >
					<slot name="restore-icon">
						<v-icon icon="mdi-square-medium-outline" :size=icon_size ></v-icon>
					</slot>
				</div>

				<div :class="{invisible: !état_min}" @click="restorer" >
					<slot name="restore-icon">
						<v-icon icon="mdi-square-rounded-outline" :size=icon_size ></v-icon>
					</slot>
				</div>

				<div :class="{invisible: état_max || état_min}" @click="maximiser" >
					<slot name="max-icon">
						<v-icon icon="mdi-square-rounded-outline" :size=icon_size ></v-icon>
					</slot>
				</div>

			</div>
		</div>
		<div :class="{invisible: état_min, colonne: !horizontal, rangée: horizontal}" 
			style="height: calc(100% - 1.8rem);"
		>
			<slot />
		</div>

	</div>
</template>

<script>
export default {
	name: "PanneauMinMax",
	props: {
		horizontal: Boolean,
		minsize: {
			type: [Number, String],
			default: 48
		},
		size: { type: [Number, String] },
		icon_size: {
			type: Number,
			default: 16
		}
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

<style scoped>
 .entête_panneau {
	width: 100%;
 }

 .bordure {
	border: 1px solid rgba(128, 128, 128, 0.25);
	max-height: 100%;
 }

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
     width: 3.5rem;
 }

 .maximisé {
     background-color: inherit;
     position: fixed;
     left: 56px;
     top: 64px;
     height: calc(100vh - 64px);
     width: calc(100vw - 56px);
     z-index: 9;
 }

 .normal {
	height: 100%;
	width: 100%
 }
 
 .colonne {
	flex-direction: column
 }
 .rangée {
	flex-direction: row
 }

</style>
