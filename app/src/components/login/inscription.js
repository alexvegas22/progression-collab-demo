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
	methods: {
		inscrire() {
			this.username_vide = this.username == "";
			this.password_vide = this.password == "";
			this.confirmation_vide = this.confirmation != this.password;

			if (this.username_vide || this.password_vide || this.confirmation_vide) return;

			this.$store
				.dispatch("authentifier", {
					urlAuth: process.env.VUE_APP_API_URL + "/inscription",
					nom_utilisateur: this.username,
					mdp: this.password,
				})
				.then((token) => {
					this.$emit("onLogin", { username: this.username, token: token, persister: this.persister });
				})
				.catch((err) => {
					if (err.response.status == 403) {
						this.$store.dispatch("deleteToken");
						this.$store.dispatch("setErreurs", { message: this.$t("erreur.inscription") });
					} else {
						this.$store.dispatch("setErreurs", { détails: err });
					}
				});
			
		}
	}
}
