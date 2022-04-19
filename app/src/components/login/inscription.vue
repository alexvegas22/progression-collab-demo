<template>
	<form
		name="inscription"
		class="form-horizontal"
		@submit.prevent="inscrire"
	>
		<div class="form-group">
			<div class="col-sm-6">
				<label
					for="username"
					class="control-label"
				>{{ $t('inscription.username') }} :</label>
				<input
					id="username"
					v-model="username"
					class="form-control"
					type="text"
					name="username"
					autofocus
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
		<div
			v-if="password_req"
			class="form-group"
		>
			<div class="form-group">
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
				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-6">
					<label
						for="conf"
						class="control-label col-sm-6"
					>{{ $t('inscription.confirmation') }} :</label>
					<input
						id="conf"
						v-model="confirmation"
						class="form-control"
						name="confirmation"
						type="password"
					>
					
					<div v-if="confirmation_vide">
						{{ $t('inscription.mdpDifférents') }}
					</div>
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
		</div>
		<div class="col-sm-offset-3">
			<input
				name="submit"
				type="submit"
				class="btn btn-primary"
				:disabled="authentificationEnCours"
				:value="$t('inscription.boutonInscription') "
			>
		</div>
	</form>
</template>

<script src="./inscription.js" />
