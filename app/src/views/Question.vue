<template>
	<div class="question">
		<Enonce v-bind:titre="question.titre" v-bind:enonce="question.énoncé" />
		<div></div>
		<div class="editeur-container">
			<EditeurCode v-bind:uri="this.uri" v-bind:username="this.username" />
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

export default {
	name: "Question",
	props: ["uri", "username"],
	components: {
		Enonce,
		Avancement,
		EditeurCode,
		JeuTests,
	},
	computed: {
		question() {
			return this.$store.state.question
		},
	},
	mounted() {
		this.$store.dispatch("getQuestion", this.uri);
		this.$store.dispatch("getAvancement", { username: this.username, uri: this.uri });
	},
	methods: {},
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
</style>
