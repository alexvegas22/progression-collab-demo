<template>
	<div class="question">
		<Enonce v-bind:titre="question.titre" v-bind:enonce="question.énoncé" />
		<div></div>
		<div class="editeur-container">
			<div class="division">
				<EditeurCode />
				<ValidationTentative v-bind:uri="this.uri" v-bind:username="this.username" />
			</div>
			<div v-if="afficherRetroaction" class="division retroaction-container" id="retroaction">
				<RetroactionTentative />
			</div>
		</div>
	</div>
	<div>
		<JeuTests />
	</div>
	<div>
		<Avancement />
	</div>
</template>

<script>
 import Enonce from "@/components/Question/Enonce.vue";
 import EditeurCode from "@/components/Question/Editeur.vue";
 import Avancement from "@/components/Question/Avancement.vue";
 import JeuTests from "@/components/Question/JeuTests";
 import RetroactionTentative from "@/components/Question/RetroactionTentative";
 import ValidationTentative from "@/components/Question/ValidationTentative";

 const API_URL = process.env.VUE_APP_API_URL + "/question/";

 export default {
	 name: "Question",
	 props: ["uri", "username"],
	 components: {
		 Enonce,
		 Avancement,
		 EditeurCode,
		 JeuTests,
		 RetroactionTentative,
		 ValidationTentative,
	 },
	 computed: {
		 question() {
			 return this.$store.state.question;
		 },
		 afficherRetroaction() {
			 return this.$store.state.afficherRetroaction;
		 },
	 },
	 mounted() {
		this.$store.dispatch("getQuestion", API_URL + this.uri);
 		if(this.$store.state.user.avancements.includes(this.$store.state.user.username + "/" + this.uri)){
			this.$store.dispatch("getAvancement", this.$store.state.user.avancements[this.$store.state.user.username + "/" + this.uri].liens.self);
		}
	 },
 };
</script>

<style>
.editeur-container {
	display: flex;
	height: auto;
	padding: 20px;
	padding-top: 0px;
	flex-direction: row;
}
.division {
	width: 50%;
	height: auto;
	float: left;
	margin: 0px 20px;
	flex-grow: 1;
}
body {
	font-family: "Avenir", Arial, Helvetica, sans-serif;
	font-size: 16px;
}
.ebauche {
	display: flex;
	padding: 1rem;
	margin: 1rem;
	background: darkgray;
}
.retroaction-container {
	border: solid 1px black;
	border-radius: 4px;
}
</style>
