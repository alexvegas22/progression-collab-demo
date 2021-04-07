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
							<p class="p-0 m-0">{{ resultat_test.test.nom }}</p>
						</div>
						<div style="clear: both"></div>
					</div>
				</div>

				<div class="col-md align-right">
				</div>
			</div>
			<div class="col-md-12" v-if="this.visible">
				<ResultatTest v-bind:resultat_test="resultat_test" />
			</div>
		</div>
	</div>
</template>

<script>
import ResultatTest from "@/components/Question/ResultatTest.vue";

export default {
	components: { ResultatTest },
	name: "Test",
	props: {
		resultat_test: {
			required: true,
		},
	},
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
