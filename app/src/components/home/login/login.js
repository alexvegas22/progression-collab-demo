import login_get_token from "@/util/login";

const API_URL = process.env.VUE_APP_API_URL;

export default {
	name: "Login",
	props: {
		password_req: String,
		domaine_mail: String,
	},
	data() {
		return {
			username: "",
			password: "",
			logué: "",
			erreurs: "",
		};
	},
	methods: {
		login() {
			const { username, password } = this;
			login_get_token(username, password)
				.then((token) => {
					this.logué = "true";
					this.$store.dispatch("getUser", API_URL + "/user/" + username);
					this.erreurs = "";
				})
				.catch((err) => {
					this.erreurs = err;
					this.logué = "";
				});
		},
	},
};