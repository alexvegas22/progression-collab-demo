<template>
	<div v-if="avancement.état === 0 | avancement.état">
		<h3>{{ convetirEtatEnString(avancement.état) }}</h3>
		<div v-if="avancement.état === 0">
			<p>Aucune tentative précédente</p>
		</div>
		<div>
			<label for="avancement">Version de la solution:</label>
			<select name="avancement" id="avancement">
				<option v-if="(tentatives.length === 0) & !this.derniereTentative" disabled selected>
					Choisir une tentative précédente
				</option>
				<option v-else disabled>Choisir une tentative précédente</option>
				<option
					v-for="tentative in tentatives"
					v-bind:key="tentative.date_soumission"
					v-on:click="chargerTentative(tentative.liens.self)"
					value="{{tentative.date_soumission}}"
				>
					Tentative du {{ convetirDateDepuisTimeStamp(tentative.date_soumission) }}
				</option>
				<option
					v-if="this.derniereTentative"
					v-on:click="chargerTentative(this.derniereTentative.liens.self)"
					value="{{this.derniereTentative.date_soumission}}"
					selected
				>
					Tentative du {{ convetirDateDepuisTimeStamp(this.derniereTentative.date_soumission) }}
				</option>
			</select>
		</div>
	</div>
</template>

<script>
export default {
	name: "Avancement",
	data() {
		return {
			derniereTentative: null,
		};
	},
	computed: {
		avancement() {
			return this.$store.state.avancement;
		},
		tentatives() {
			return this.$store.state.avancement.tentatives;
		},
	},
	watch: {
		tentatives: function () {
			if (this.tentatives.length > 0) {
				this.derniereTentative = this.tentatives[this.tentatives.length - 1];
				this.tentatives.pop();
			}
		},
	},
	methods: {
		chargerTentative: function (lien) {
			this.$store.dispatch("getTentative", lien);
			this.$store.commit("setAfficherRetroaction", true);
		},
		convetirDateDepuisTimeStamp: function (timestamp) {
			let date = new Date(timestamp * 1000);
			return date.toLocaleString("fr-CA");
		},
		convetirEtatEnString: function (etat) {
			let etatString;
			switch (etat) {
				case 0:
					etatString = "Vous en êtes à votre première tentative !";
					break;
				case 1:
					etatString = "La question n'a pas encore été résolue !";
					break;
				case 2:
					etatString = "La question a déjà été correctement résolue !";
					break;
				default:
					etatString = "La question est indéterminée !";
			}
			return etatString;
		},
	},
};
</script>
