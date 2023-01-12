export default {
	name: "NavBar",
	data() {
		return {
			nouvelUrl: "",
		};
	},
	emits: ["connexion", "déconnexion" ],
	computed: {
		token() {
			return this.$store.state.token;
		},
		indicateursDeFonctionnalitéVersionTest(){
			return this.$store.state.indicateursDeFonctionnalité["version_test"];
		},
		versionTest(){
			return this.$cookies.get("fe_version")=="dev";
		},
		raccourcis(){
			return this.$store.state.raccourcis;
		},
		thèmeSombre() {
			return this.$store.getters.thèmeSombre;
		},
		username() {
			return this.$store.state.username;
		},
		locale() {
			return this.$store.getters.locale;
		}
	},
	methods: {
		basculerThèmeSombre() {
			this.$store.dispatch("basculerThèmeSombre");
		},
		basculerVersionTest() {
			const version = this.$cookies.get("fe_version");
			this.$cookies.set("fe_version", version != "dev" ? "dev" : "prod");
			window.location.reload();
		},
		basculerLocale() {
			this.$store.dispatch("basculerLocale");
		},
		allerVers( vue ){
			this.$router.push({
				name: vue,
			});
		},
		chargerNouveau(){
			const uri = this.obtenirUri(this.nouvelUrl);
			if(uri) {
				this.$store.dispatch("setUri", uri);
				this.allerVers("Question");
				this.nouvelUrl="";
			}
		},
		obtenirUri(entrée){
			const entrée_trim = entrée.trim();
			const uri_matchs = entrée_trim.match( /uri=(.*?)(?:&|$)/ );
			const uri = (uri_matchs == null || uri_matchs.length < 2) ? entrée_trim : uri_matchs[1];

			var entrée_décodée;
			try {
				entrée_décodée = atob( uri );
			}
			catch( e ){
				// Il ne s'agit pas d'une chaîne en b64. On l'essaye telle quelle
				entrée_décodée=entrée;
			}
			
			const url_matchs = entrée_décodée.match( /http.*$/ );
			return url_matchs && btoa(url_matchs[0]).replace(/=/g,"");
		}
	}
};
