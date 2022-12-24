export default {
	name: "Inscription",
	emits: {
		onLogin: Object,
	},
	props:{
		password_req: Boolean,
	},
	data() {
		return {
			username: "",
			password: "",
			confirmation: "",
			persister: true,
			username_vide: false,
			username_invalide: false,
			password_vide: false,
			confirmation_vide: false,
		};
	},
	computed: {
		authentificationPermise: function(){
			return !this.$store.state.token && !this.$store.state.authentificationEnCours;
		},
	},
	methods: {
		inscrire() {
			this.username_vide = this.username == "";
			this.username_invalide = !this.username_vide && !this.username.match(/^[-a-zA-Z0-9_]+$/);
			this.password_vide = this.password_req && this.password == "";
			this.confirmation_vide =this.password_req && this.confirmation != this.password;

			if (this.username_vide || this.username_invalide || this.password_vide || this.confirmation_vide) return;

			this.$emit("onLogin", { username: this.username, password: this.password, persister: this.persister, inscrire: true });
			
		}
	}
};
