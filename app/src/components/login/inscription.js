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
			courriel: "",
			username: "",
			password: "",
			confirmation: "",
			persister: true,
		};
	},
	computed: {
		authentificationPermise(){
			return !this.$store.getters.obtenirToken() && !this.$store.state.authentificationEnCours;
		},
		courriel_vide(){
			return this.courriel.trim() == "";
		},
		courriel_invalide(){
			return !this.courriel.toLowerCase().match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
		},
		confirmation_vide() {
			return this.password_req && this.confirmation != this.password;
		},
		password_vide() {
			return this.password_req && this.password == "";
		},
		username_vide() {
			return this.username.trim() == "";
		},
		username_invalide() {
			return !this.username_vide && !this.username.trim().match(/^[-a-zA-Z0-9_]+$/);
		}
	},
	methods: {
		inscrire() {
			if (!(this.courriel_vide ||
				  this.courriel_invalide ||
				  this.username_vide ||
				  this.username_invalide ||
				  this.password_vide ||
				  this.confirmation_vide)) {
				this.$emit("onLogin", { courriel: this.courriel.trim(), username: this.username.trim(), password: this.password, persister: this.persister, inscrire: true });
			}
		}
	}
};
