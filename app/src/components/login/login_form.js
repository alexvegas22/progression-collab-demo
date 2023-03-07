export default {
	name: "LoginLDAP",
	emits: {
		onLogin: Object,
	},
	props : {
		domaine: String,
		url_mdp_reinit: String,
	},
	data() {
		return {
			username: "",
			password: "",
			persister: true,
		};
	},
	computed: {
		placeholder: function(){
			return this.domaine ? "@"+this.domaine : "";
		},
		authentificationPermise(){
			return !this.$store.getters.obtenirToken() && !this.$store.state.authentificationEnCours;
		},
		password_vide() {
			return this.password == "";
		},
		username_vide() {
			return this.username.trim() == "";
		},
		username_invalide() {
			return !this.username_vide && !this.username.trim().match(/^[-a-zA-Z0-9_]+$/);
		}
	},
	methods: {
		login() {
			if (!(this.username_vide ||
				  this.username_invalide ||
				  this.password_vide)){

				this.$emit("onLogin", { username: this.username.trim(), password: this.password, persister: this.persister, domaine: this.domaine });
			}
		},
	},
};
