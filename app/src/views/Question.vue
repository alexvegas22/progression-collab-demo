<template>
  <div class="question">
    <Enonce v-bind:titre="question.titre" v-bind:enonce="question.énoncé" />
    <div class="editeur-container">
      <div class="division">
        <EditeurCode />
        <button
          type="button"
          class="btn btn-success btn-valider p-3"
          style="margin-top: 15px; width: 100%"
          :disabled="envoiEnCours"
          @click="validerTentative"
        >
          Valider
        </button>
      </div>
.      <div class="division retroaction-container d-none" id="retroaction">
        <ValidationTentative />
      </div>
    </div>
  </div>
  <div>
    <JeuTests v-bind:tests="tests" />
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
import ValidationTentative from "@/components/Question/ValidationTentative";

export default {
  name: "Question",
  components: {
    Enonce,
    Avancement,
    EditeurCode,
    JeuTests,
    ValidationTentative,
  },
  computed: {
    question() {
      return this.$store.state.question;
    },
    tests() {
      return this.$store.state.question.tests;
    },
    envoiEnCours() {
      return this.$store.state.envoiTentativeEnCours;
    },
  },
	 mounted() {
		 const urlQuestion = this.$route.query.uri;
		 const username = this.$route.query.username;

		 this.$store.dispatch("getQuestion", urlQuestion);
		 this.$store.dispatch("getAvancement", {username, urlQuestion});
  },
  methods: {
    validerTentative() {
      this.$store.dispatch("soumettreTentative", this.langage, this.code );
      var element = document.getElementById("retroaction");
      element.classList.remove("d-none");
     },
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

.btn-valider {
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
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
