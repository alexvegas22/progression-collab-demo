<template>
	<div class="pb-5">
		<div v-on:click="toggleVisibilite">
			<div class="row w-100 m-0">
				<div class="col-md text-right" v-if="this.visible">
					<span style="font-size: 200%"> &#11167; </span>
				</div>
        <div class="col-md text-right" v-else>
					<span style="font-size: 200%"> &#10148; </span>
				</div>

				<div class="col-md-8">
					<div class="p-2 border">
						<div class="float-left">
							<p class="p-0 m-0">{{ test.nom }}</p>
						</div>
						<!--div class="float-right"-->
							<!--Il n'y a pas de «resultat» dans un objet «test» selon l'api. Il faudrait investiguer là dessus -->
							<!--span style="font-size: 200%" v-if="test.resultat"> &#9989; </span>
							<span v-else> &#10060; </span>
						</div-->
						<div style="clear: both"></div>
					</div>
				</div>

				<div class="col-md align-right">
					<button class="btn btn-secondary" disabled> &#10148; Lancer Le test</button>
				</div>
			</div>
			<div class="col-md-12" v-if="this.visible">
				<Resultat v-bind:test="test" v-bind:resultat="resultat" />
			</div>
		</div>
	</div>
</template>

<script>
//import ValidationTentative from "@/components/Question/ValidationTentative.vue";
import Resultat from "@/components/Question/Resultat.vue";

export default {
	components: { /*ValidationTentative,*/ Resultat },
	name: "Test",
	props: {
		test: {
			required: true,
		},
    resultat: {
			required: true,
		},
	},
	/*watch: {
		test: function () {
			this.texteUnTest = this.test;
		},
	},*/
	data() {
		return {
			visible: false,
		};
	},
	methods: {
		toggleVisibilite() {
			this.visible = !this.visible;
		},
	},
};
</script>
