<template>
	<form name="login" class="form-horizontal" @submit.prevent="login_standard">
		<div class="form-group">
			<div class="col-sm-6">
				<label for="username" class="control-label">{{ $t('login.courriel') }}</label>
				<input class="form-control" type="text" id="username" name="username" autofocus v-model="username"/>
				<div v-if="username_vide">Champ obligatoire</div>
			</div>
			<div class="col-sm-6">
			</div>
		</div>
		<div class="form-group" v-if="password_req">
			<div class="col-sm-6">
				<label for="passwd" class="control-label">{{ $t('login.motDePasse') }}</label>
				<input class="form-control" id="passwd" name="passwd" type="password" v-model="password" />
				<div v-if="password_vide">Champ obligatoire</div>
			</div>
		</div>
		<br>
		<div class="form-group">
			<div class="col-sm-6">
				<input id="persister" name="persister" type="checkbox" v-model="persister" />
				<label for="persister" class="control-label"  style="padding-left: 5px;">{{ $t('login.persister') }}</label>
			</div>
		</div>

		<div class="col-sm-offset-3">
			<input name="submit" type="submit" class="btn btn-primary" :value="$t('login.boutonConnexion') "/>
		</div>
	</form>
</template>

<script src="./login_ldap.js"></script>
