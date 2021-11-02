const axios = require("axios");

const API_URL = process.env.VUE_APP_API_URL;

export default {
	name: "Login",
	props: {
		password_req: String,
		domaine_mail: String,
		plateforme: String,
		cours: String,
	},
	emits: {
		onAuth: Boolean,
		onLogin: Object,
	},
	data() {
		return {
			username: "",
			password: "",
			auth: true,
			persister: true,
			username_vide: false,
			password_vide: false,
		};
	},
	methods: {
		login() {
			this.username_vide = this.username == "";
			this.password_vide = this.password == "";

			if (this.username_vide || this.password_vide) return;

			this.$store
				.dispatch("authentifier", {
					urlAuth: process.env.VUE_APP_API_URL + "/auth",
					nom_utilisateur: this.username,
					mdp: this.password,
				})
				.then((token) => {
					if (this.auth) {
						this.$emit("onAuth", this.auth);
					}

					this.$emit("onLogin", { username: this.username, token: token, persister: this.persister });
				})
				.catch((err) => {
					console.log(err);
					if (err.response.status == 401) {
						this.$store.dispatch("deleteToken");
						this.$store.dispatch("setErreurs", { message: this.$t("erreur.authentification") });
					} else {
						this.$store.dispatch("setErreurs", { détails: err });
					}
				});
		},
	},
};
