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
					header: { "title": "Bienvenue" },
					content: "Bienvenue à Progression, le gym de la programmation",
					params:{
						placement: "center"
					}
				},
				{
					target: '[présentation_étape="0"]',
					scrolling: false,
					header: { "title": "Énoncé" },
					content: "L'énoncé de l'exercice se trouve dans cette partie",
				},
				{
					target: '[présentation_étape="0.1"]',
					scrolling: false,
					header: { "title": "Énoncé" },
					content: "Le titre sera marqué d'un crochet vert lorsqu'il sera réussi"
				},
				{
					target: '[présentation_étape="0.2"]',
					scrolling: false,
					header: { "title": "Énoncé" },
					content: "Le niveau de difficulté de l'exercice"
				},
				{
					target: '[présentation_étape="0.3"]',
					scrolling: false,
					header: { "title": "Énoncé" },
					content: 'La tâche à effectuer est détaillée ici :<ul><li>entrées<li>sorties<li>exemples<li>etc.</ul> Lisez bien!'
				},
				{
					target: '[présentation_étape="1"]',
					scrolling: false,
					header: { "title": "Code" },
					content: "L'éditeur de code. C'est ici que se passe votre travail!",
					params:{
						placement: "right"
					}
				},
				{
					target: '[présentation_étape="1.0"]',
					scrolling: false,
					header: { "title": "Code" },
					content: "Préférences d'affichage. Êtes-vous plutôt nocture ou plutôt diurne?"
				},
				{
					target: '[présentation_étape="1.1"]',
					header: { "title": "Code" },
					scrolling: false,
					content: "Complétez le code proposé ici. Certaines lignes sont occultées, d'autres sont désactivées pour vous permettre de rester concentré sur ce qui est essentiel à votre tâche."
				},
				{
					target: '[présentation_étape="1.2"]',
					scrolling: false,
					header: { "title": "Validation" },
					content: 'Validation. Vous croyez avoir complété la tâche? Validez votre réponse en cliquant ici.',
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
					header: { "title": "Progression" },
					content: 'Votre progression. Si tout est vert ici, vous avez réussi!'
				},
				{
					target: '[présentation_étape="2.1"]',
					scrolling: false,
					header: { "title": "Rétroaction" },
					content: "Pour des conseils, surveillez l'💡 qui apparaîtra ici",
					params:{
						placement: "right"
					}					
				},
				{
					target: '[présentation_étape="3.0"]',
					scrolling: false,
					header: { "title": "Tests" },
					content: "Ces tests doivent tous être validés pour que l'exercice soit réussi"
				},
				{
					target: '[présentation_étape="3.1"]',
					scrolling: false,
					header: { "title": "Tests" },
					content: "Chacun des tests fournit des entrées différentes au programme"
				},
				{
					target: '[présentation_étape="3.2"]',
					scrolling: false,
					header: { "title": "Tests" },
					content: "et s'assure d'avoir reçu des sorties très spécifiques.",
					params:{
						placement: "top"
					}					
				},
				{
					target: '[présentation_étape="3.3"]',
					scrolling: false,
					header: { "title": "Rétroaction" },
					content: "Les sorties de votre programme doivent concorder exactement!",
					params:{
						placement: "top"
					}										
				},
				{
					target: '[présentation_étape="4.0"]',
					scrolling: false,
					header: { "title": "Avancement" },
					content: "Utilisez ce menu pour changer de langage de programmation...",
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
					header: { "title": "Avancement" },
					content: "revenir à l'ébauche initiale de l'exercice pour ce langage...",
					params:{
						placement: "left"
					}					
				},
				{
					target: '[présentation_étape="4.2"]',
					scrolling: false,
					header: { "title": "Avancement" },
					content: "ou à une tentative précédente.",
					params:{
						placement: "left"
					}					
				},
				{
					target: '[présentation_étape="00"]',
					scrolling: false,
					header: { "title": "Au travail" },
					content: "Et maintenant, à vous de jouer!",
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
