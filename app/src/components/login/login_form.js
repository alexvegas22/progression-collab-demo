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
			username_vide: false,
			username_invalide: false,
			password_vide: false,
		};
	},
	computed: {
		placeholder: function(){
			return this.domaine ? "@"+this.domaine : "";
		},
		authentificationPermise: function(){
			return !this.$store.getters.token && !this.$store.state.authentificationPermise;
		},
	},
	methods: {
		login() {
			this.username_vide = this.username == "";
			this.username_invalide = !this.username_vide && !this.username.match(/^[-a-zA-Z0-9_]+$/);
			this.password_vide = this.password == "";

			if (this.username_vide || this.username_invalide || this.password_vide) return;

			this.$emit("onLogin", { username: this.username, password: this.password, persister: this.persister, domaine: this.domaine });
			
		},
	},
};
