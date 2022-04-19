
<template>
	<form
		name="login"
		class="form-horizontal"
		@submit.prevent="login"
	>
		<div class="form-group">
			<div class="col-sm-6">
				<label
					for="username"
					class="control-label"
				>{{ $t('login.courriel') }} :</label>
				<input
					id="username"
					v-model="username"
					class="form-control"
					type="text"
					name="username"
					autofocus
					:placeholder="placeholder"
				>
				<div v-if="username_vide">
					{{ $t('login.champObligatoire') }}
				</div>
				<div v-if="username_invalide">
					{{ $t('login.usernameInvalide') }}
				</div>				
			</div>
			<div class="col-sm-6" />
		</div>
		<div class="col-sm-6">
			<label
				for="passwd"
				class="control-label"
			>{{ $t('login.motDePasse') }} :</label>
			<input
				id="passwd"
				v-model="password"
				class="form-control"
				name="passwd"
				type="password"
			>
			<div v-if="password_vide">
				{{ $t('login.champObligatoire') }}
			</div>
			<div v-if="url_mdp_reinit">
				<a :href="url_mdp_reinit">{{ $t('login.mdpOublié') }}</a>
			</div>
		</div>
		<br>
		<div class="form-group">
			<div class="col-sm-6">
				<input
					id="persister"
					v-model="persister"
					name="persister"
					type="checkbox"
				>
				<label
					for="persister"
					class="control-label"
					style="padding-left: 5px;"
				>{{ $t('login.persister') }}</label>
			</div>
		</div>
		<div class="col-sm-offset-3">
			<input
				name="submit"
				type="submit"
				class="btn btn-primary"
				:disabled="authentificationEnCours"
				:value="$t('login.boutonConnexion') "
			>
		</div>
	</form>
</template>

<script src="./login_form.js"></script>
