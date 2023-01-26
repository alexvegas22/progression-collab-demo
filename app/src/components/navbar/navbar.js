export default {
	name: "NavBar",
	data() {
		return {
			nouvelUrl: "",
		};
	},
	props: {
		drawer: Boolean,
	},
	emits: ["accomplissements", "basculerLocale", "basculerThèmeSombre", "basculerVersion", "déconnexion" ],
	computed: {
		menus() {
			return [
				{
					title: this.$t("menu.exercices"),
					icon: "mdi-laptop",
					sous_menus: [
						{title: this.$t("menu.accomplissement"),
						 icon: "mdi-trophy",
						 value: "accomplissements",
						 action: () => this.$emit("accomplissements") },
						{title: this.$t("menu.nouveau"),
						 icon: "mdi-plus",
						 value: "nouveau"},
					]
				},
				{
					title: this.$t("menu.préférences"),
					icon: "mdi-tune",
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
				{
					title: this.$t("menu.déconnexion"),
					icon: "mdi-logout",
					value: "déconnexion",
					action: ()=>this.$emit("déconnexion")
				}
			];

		},
		token() {
			return this.$store.state.token;
		},
		indicateursDeFonctionnalitéVersionTest(){
			return this.$store.state.indicateursDeFonctionnalité["version_test"];
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
