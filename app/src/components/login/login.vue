<template>
	<div class="container" id="login">
		<div id="main-logo">
			<a href="/">
				<h1>Progression</h1>
			</a>
		</div>
		<form name="login" class="form-horizontal" @submit.prevent="login">
			<div class="form-group">
				<label id="loginTxt" class="control-label col-sm-3">{{ $t('login.courriel') }}</label>
				<div class="col-sm-3">
					<input class="form-control" type="text" name="username" autofocus v-model="username" />
					<div v-if="username_vide">Champ obligatoire</div>
				</div>
				<div class="col-sm-3">
					<label style="text-align: left; color: #888">{{ domaine_mail }}</label>
				</div>
			</div>
			<div class="form-group" v-if="password_req">
				<label id="" class="control-label col-sm-3">{{ $t('login.motDePasse') }}</label>
				<div class="col-sm-3">
					<input class="form-control" name="passwd" type="password" v-model="password" />
					<div v-if="password_vide">Champ obligatoire</div>
				</div>
			</div>
			<br>
			<label id="" class="control-label col-sm-3">{{ $t('login.persister') }}</label>
			<div class="col-sm-1">
				<input name="persister" type="checkbox" v-model="persister" />
			</div>
			<div>
				
			</div>
			<div class="col-sm-offset-3 uk-margin">
				<input name="submit" type="submit" class="btn btn-primary" :value="$t('login.boutonConnexion') "/>
			</div>

		   
		</form>
	</div>
</template>
<script src="./login.js"></script>
