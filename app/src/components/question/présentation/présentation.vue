<template>
	<v-tour name="Présentation" :steps="étapes_présentation" :options="options_présentation" />
</template>
<script>
 export default {
	 name: "Présentation",
	 data () {
		 return {
			 étapes_présentation: [
				 {
					 target: '[présentation_étape="00"]',
					 scrolling: false,
					 header: { "title": this.$t('présentation.bienvenue.titre') },
					 content: this.$t('présentation.bienvenue.contenu'),
					 params:{
						 placement: "center"
					 }
				 },
				 {
					 target: '[présentation_étape="0"]',
					 scrolling: false,
					 header: { "title": this.$t('présentation.énoncé.titre') },
					 content: this.$t('présentation.énoncé.contenu'),
				 },
				 {
					 target: '[présentation_étape="0.1"]',
					 scrolling: false,
					 header: { "title": this.$t('présentation.titre.titre') },
					 content: this.$t('présentation.titre.contenu'),
				 },
				 {
					 target: '[présentation_étape="0.2"]',
					 scrolling: false,
					 header: { "title": this.$t('présentation.niveau.titre') },
					 content: this.$t('présentation.niveau.contenu'),
				 },
				 {
					 target: '[présentation_étape="0.3"]',
					 scrolling: false,
					 header: { "title": this.$t('présentation.énoncé_détail.titre') },
					 content: this.$t('présentation.énoncé_détail.contenu'),
				 },
				 {
					 target: '[présentation_étape="1"]',
					 scrolling: false,
					 header: { "title": this.$t('présentation.code.titre') },
					 content: this.$t('présentation.code.contenu'),
					 params:{
						 placement: "right"
					 }
				 },
				 {
					 target: '[présentation_étape="1.0"]',
					 scrolling: false,
					 header: { "title": this.$t('présentation.pref_affichage.titre') },
					 content: this.$t('présentation.pref_affichage.contenu'),
				 },
				 {
					 target: '[présentation_étape="1.1"]',
					 scrolling: false,
					 header: { "title": this.$t('présentation.ébauche.titre') },
					 content: this.$t('présentation.ébauche.contenu'),
				 },
				 {
					 target: '[présentation_étape="1.2"]',
					 scrolling: false,
					 header: { "title": this.$t('présentation.validation.titre') },
					 content: this.$t('présentation.validation.contenu'),
					 before: type => new Promise((resolve, reject) => {
						 if(type=="next"){
							 var dropdown = document.getElementById('btn_soumettre_tentative');
							 var event;
							 event = document.createEvent('MouseEvents');
							 event.initMouseEvent('click', true, true, window);
							 dropdown.dispatchEvent(event);
						 }
						 resolve();
					 })
				 },
				 {
					 target: '[présentation_étape="2.0"]',
					 scrolling: false,
					 header: { "title": this.$t('présentation.progression.titre') },
					 content: this.$t('présentation.progression.contenu'),
				 },
				 {
					 target: '[présentation_étape="3.0"]',
					 scrolling: false,
					 header: { "title": this.$t('présentation.jeu_tests.titre') },
					 content: this.$t('présentation.jeu_tests.contenu'),
				 },
				 {
					 target: '[présentation_étape="3.1"]',
					 scrolling: false,
					 header: { "title": this.$t('présentation.entrées.titre') },
					 content: this.$t('présentation.entrées.contenu'),
				 },
				 {
					 target: '[présentation_étape="3.2"]',
					 scrolling: false,
					 header: { "title": this.$t('présentation.sorties_attendues.titre') },
					 content: this.$t('présentation.sorties_attendues.contenu'),
					 params:{
						 placement: "top"
					 }					
				 },
				 {
					 target: '[présentation_étape="3.3"]',
					 scrolling: false,
					 header: { "title": this.$t('présentation.sorties_observées.titre') },
					 content: this.$t('présentation.sorties_observées.contenu'),
					 params:{
						 placement: "top"
					 }										
				 },
				 {
					 target: '[présentation_étape="2.1"]',
					 scrolling: false,
					 header: { "title": this.$t('présentation.rétroaction.titre') },
					 content: this.$t('présentation.rétroaction.contenu'),
					 params:{
						 placement: "right"
					 }					
				 },
				 {
					 target: '[présentation_étape="4.0"]',
					 scrolling: false,
					 header: { "title": this.$t('présentation.avancement.titre') },
					 content: this.$t('présentation.avancement.contenu'),
					 before: type => new Promise((resolve, reject) => {
						 if(type=="next"){
							 var dropdown = document.getElementById('menu_historique');
							 var event;
							 event = document.createEvent('MouseEvents');
							 event.initMouseEvent('click', true, true, window);
							 dropdown.dispatchEvent(event);
							 console.log("click");
						 }
						 resolve();
					 }),
					 params:{
						 placement: "left"
					 }					
				 },
				 {
					 target: '[présentation_étape="4.1"]',
					 scrolling: false,
					 header: { "title": this.$t('présentation.ébauche_initiale.titre') },
					 content: this.$t('présentation.ébauche_initiale.contenu'),
					 params:{
						 placement: "left"
					 }					
				 },
				 {
					 target: '[présentation_étape="4.2"]',
					 scrolling: false,
					 header: { "title": this.$t('présentation.tentative.titre') },
					 content: this.$t('présentation.tentative.contenu'),
					 params:{
						 placement: "left"
					 }					
				 },
				 {
					 target: '[présentation_étape="00"]',
					 scrolling: false,
					 header: { "title": this.$t('présentation.fin.titre') },
					 content: this.$t('présentation.fin.contenu'),
					 params:{
						 placement: "center"
					 }					
				 }				
			 ],
			 options_présentation: {
				 labels: {
					 buttonSkip: this.$t('présentation.passer'),
					 buttonPrevious: this.$t('présentation.précédent'),
					 buttonNext: this.$t('présentation.suivant'),
					 buttonStop: this.$t('présentation.terminer')
				 },
				 highlight: true,
			 }
		 }
	 },
	 mounted() {
		 this.$tours['Présentation'].start()
	 }
 }
</script>
