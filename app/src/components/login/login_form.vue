
<template>
	<form
		name="login"
		class="form-horizontal"
		@submit.prevent="login"
	>
		<fieldset :disabled="!authentificationPermise">
			<div class="form-group">
				<div class="col-sm-6">
					<label
						for="username"
						class="control-label"
					>{{ $t('login.identifiant') }} :</label>
					<input
						id="username"
						v-model="identifiant"
						class="form-control"
						type="text"
						name="username"
						autofocus
						:placeholder="placeholder"
					>
					<div v-if="identifiant_invalide">
						{{ $t('login.identifiantInvalide') }}
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
				<v-btn
					type="submit"
					:disabled="!authentificationPermise ||
						this.identifiant_vide ||
						this.identifiant_invalide ||
						this.password_vide"
				>
					{{$t('login.boutonConnexion')}}
				</v-btn>
			</div>
		</fieldset>
	</form>
</template>

<script src="./login_form.js"></script>
