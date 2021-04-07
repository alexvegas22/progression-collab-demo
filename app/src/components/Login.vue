<template>
	<div class="container" id="login">
		<div id="main-logo">
			<a href="/">
				<h1>Progression</h1>
			</a>
		</div>
		<form v-if="!logué" name="login" class="form-horizontal" @submit.prevent="login">
			<div class="form-group">
				<label id="loginTxt" class="control-label col-sm-3">Courriel : </label>
				<div class="col-sm-3">
					<input class="form-control" type="text" name="username" autofocus v-model="username" />
				</div>
				<div class="col-sm-3">
					<label style="text-align: left; color: #888">{{ domaine_mail }}</label>
				</div>
			</div>
			<div class="form-group" v-if="password_req">
				<label id="" class="control-label col-sm-3">Mot de passe : </label>
				<div class="col-sm-3">
					<input class="form-control" name="passwd" type="password" v-model="password" />
				</div>
			</div>
			<div class="col-sm-offset-3 uk-margin">
				<input name="submit" type="submit" class="btn btn-primary" value="Connexion" />
			</div>
		</form>
		<div v-if="erreurs">
			{{ erreurs }}
		</div>
	</div>
</template>

<script>
import login_get_token from "@/util/login";

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
			token: "",
			erreurs: "",
		};
	},
	methods: {
		login() {
			const { username, password } = this;
			login_get_token(username, password)
				.then((token) => {
					this.logué = "true";
					this.token = token;
					this.erreurs = "";
				})
				.catch((err) => {
					this.erreurs = err;
					this.logué = "";
				});
		},
	},
};
</script>
