<template>
	<form name="inscription" class="form-horizontal" @submit.prevent="inscrire">
		<div class="form-group">
			<div class="col-sm-6">
				<label for="username" data-test="username" class="control-label">Veuillez choisir un nom d'utilisateur :</label>
				<input class="form-control" type="text" id="username" name="username" autofocus v-model="username"/>
				<!--<div v-if="username_vide">{{ ('login.champObligatoire') }}</div>
				<div v-if="username_invalide">{{ ('login.usernameInvalide') }}</div>-->
			</div>
			<div class="col-sm-6">
			</div>
		</div>
		<!--<div class="form-group" v-if="password_req">-->

			<div class="form-group">
				<div class="col-sm-6">
					<label for="passwd" data-test="passwd" class="control-label">Mot de passe :</label>
					<input class="form-control" id="passwd" name="passwd" type="password" v-model="password" />
					<div v-if="password_vide">{{ ('login.champObligatoire') }}</div>
				</div>
			</div>
			<div class="form-group" >
				<div class="col-sm-6">
					<label for="conf" class="control-label col-sm-6">{{ ('inscription.confirmation') }} :</label>
					<input id="conf" class="form-control" name="confirmation" type="password" v-model="confirmation" />
					
					<div v-if="confirmation_vide">{{ ('inscription.mdpDifférents') }}</div>
				</div>
			</div>
			<br>
			<div class="form-group">
				<div class="col-sm-6">
					<input id="persister" name="persister" type="checkbox" v-model="persister" />
					<label for="persister" class="control-label"  style="padding-left: 5px;">{{ ('login.persister') }}</label>
				</div>
			</div>

		<!--</div>-->
		<!--<div class="col-sm-offset-3">
			<input name="submit" type="submit" class="btn btn-primary" :disabled="authentificationEnCours" :value="$t('inscription.boutonInscription') "/>
		</div>-->
	</form>
</template>

<script src="./inscription.js" />
