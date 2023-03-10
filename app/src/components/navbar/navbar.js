export default {
	name: "NavBar",
	data() {
		return {
			nouvelUrl: "",
			exercices: new Boolean(false),
			préférences: new Boolean(false),
		};
	},
	emits: ["accomplissements",
		"nouvelExercice",
		"basculerLocale",
		"basculerThèmeSombre",
		"basculerVersion",
	],
	methods: {
		onUpdateRail(état){
			if(état){
				this.exercices = new Boolean(false);
				this.préférences = new Boolean(false);
			}
		}
	},
	computed: {
		menus() {
			return [
				{
					title: this.$t("menu.exercices"),
					icon: "mdi-laptop",
					value: this.exercices,
					sous_menus: [
						{title: this.$t("menu.nouveau"),
						 icon: "mdi-plus",
						 value: "nouveau",
						 action: () => this.$emit("nouvelExercice") },
						{title: this.$t("menu.accomplissement"),
						 icon: "mdi-trophy",
						 value: "accomplissements",
						 action: () => this.$emit("accomplissements") },
					]
				},
				{
					title: this.$t("menu.préférences"),
					icon: "mdi-tune",
					value: this.préférences,
					sous_menus: [
						{title: this.$t(this.locale=="fr" ? "menu.english":"menu.français"),
						 subtitle: "test",
						 icon: "mdi-translate",
						 value: "langue",
						 action: () => this.$emit("basculerLocale") },
						{title: this.$t(this.thèmeSombre ? "menu.thèmeClair":"menu.thèmeSombre"),
						 icon: "mdi-theme-light-dark",
						 value: "thème",
						 action: () => this.$emit("basculerThèmeSombre") },
						{title: this.$t(this.versionTest ? "menu.versionStandard" : "menu.versionTest"),
						 icon: "mdi-test-tube",
						 value: "versionTest",
						 action: () => this.$emit("basculerVersion"),
						 activé: this.indicateursDeFonctionnalitéVersionTest },
					]
				},
			];
		},
		token() {
			return this.$store.getters.obtenirToken();
		},
		indicateursDeFonctionnalitéVersionTest(){
			return this.$store.getters.indicateursDeFonctionnalité("version_test");
		},
		versionTest(){
			return this.$cookies.get("fe_version")=="dev";
		},
		thèmeSombre() {
			return this.$store.getters.thèmeSombre;
		},
		locale() {
			return this.$store.getters.locale;
		}
	},
};
