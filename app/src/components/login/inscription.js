const API_URL = process.env.VUE_APP_API_URL;

export default {
	name: "Inscription",
	emits: {
		onLogin: Object,
	},
	data() {
		return {
			username: "",
			password: "",
			confirmation: "",
			persister: true,
			username_vide: false,
			password_vide: false,
			confirmation_vide: false,
		};
	},
	computed: {
		authentificationEnCours: function(){
			return this.$store.state.authentificationEnCours;
		},
	},
	methods: {
		inscrire() {
			this.username_vide = this.username == "";
			this.password_vide = this.password == "";
			this.confirmation_vide = this.confirmation != this.password;

			if (this.username_vide || this.password_vide || this.confirmation_vide) return;

			this.$emit("onLogin", { username: this.username, password: this.password, persister: this.persister, inscrire: true });
			
		}
	}
}
