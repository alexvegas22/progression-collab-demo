<template>
	<v-dialog
		v-model="affiché"
		width="600"
		@keydown.enter="ok"
	>
		<v-card>
			<v-card-title>
				{{$t("dialogues.nouvel_exercice.titre")}}
			</v-card-title>
			<v-container>
				<v-card-text>
					{{$t("dialogues.nouvel_exercice.invite_url")}}
				</v-card-text>
			</v-container>
			<v-text-field
				:label='$t("dialogues.nouvel_exercice.champ_url")'
				v-model="urlNouvelExercice"
				autofocus
				clearable
				single-line
				required>
			</v-text-field>
			<v-card v-if="$store.getters.démos"
				@click="redirectionAccomplissements">
				<v-card-text>
					{{$t("dialogues.nouvel_exercice.exercices_démo")}}
				</v-card-text>
			</v-card>
			<v-card-actions>
				<v-btn
					color="primary"
					text
					@click="ok"
					:disabled="!validerURL()"
				>
					{{$t("dialogues.nouvel_exercice.bouton_ok")}}
				</v-btn>
				<v-btn
					color="primary"
					text
					@click="annuler"
				>
					{{$t("dialogues.nouvel_exercice.bouton_annuler")}}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import obtenirUri from "@/util/url.js";

export default {
	name: "DialogURL",
	emits: ["ok"],
	props : {
		ouvrir: Boolean,
	},
	data() {
		return {
			affiché: false,
			urlNouvelExercice: "",
		};
	},
	methods :{
		ok() {
			this.affiché = false;
			this.traiterNouvelExercice();
		},
		annuler() {
			this.affiché = false;
		},
		redirectionAccomplissements() {
			this.$router.push( {name: "Accomplissements"});
			this.affiché = false;
		},
		traiterNouvelExercice() {
			this.$emit("ok", this.validerURL( this.urlNouvelExercice ));
		},
		validerURL(){
			return obtenirUri( this.urlNouvelExercice );
		}
	},
	watch : {
		ouvrir() {
			this.urlNouvelExercice = "";
			this.affiché = true;
		},
	}
};
</script>
