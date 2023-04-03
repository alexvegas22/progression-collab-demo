export default {
	name: "Inscription",
	emits: {
		onLogin: Object,
	},
	props:{
		auth_local: Boolean,
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
			return !this.courriel_vide && !this.courriel.toLowerCase().match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
		},
		confirmation_vide() {
			return this.auth_local && this.confirmation != this.password;
		},
		password_vide() {
			return this.auth_local && this.password == "";
		},
		username_vide() {
			return this.username.trim() == "";
		},
		username_invalide() {
			return !this.username_vide && !this.username.trim().match(/^[-a-zA-Z0-9_]+$/);
		},
		champs_valides() {
			return !this.username_vide &&
				   !this.username_invalide &&
				   (!this.auth_local ||
					!this.password_vide &&
					!this.courriel_vide &&
					!this.courriel_invalide &&
					!this.confirmation_vide);
		}
	},
	methods: {
		inscrire() {
			if (this.champs_valides) {
				this.$emit("onLogin", { courriel: this.courriel.trim(), username: this.username.trim(), password: this.password, persister: this.persister, inscrire: true });
			}
		}
	}
};
