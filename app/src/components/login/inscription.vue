<template>
	<form
		name="inscription"
		class="form-horizontal"
		@submit.prevent="inscrire"
	>
		<fieldset :disabled="!authentificationPermise">
			<div class="form-group">
				<div class="col-sm-6">
					<label
						for="courriel"
						class="control-label"
					>
						{{ $t('inscription.courriel') }} :
					</label>
					<input
						id="courriel"
						v-model="courriel"
						class="form-control"
						type="email"
						name="courriel"
						autofocus
					>
					<div v-if="courriel_invalide">
						{{ $t('inscription.courrielInvalide') }}
					</div>
				</div>
				<div class="col-sm-6" />
			</div>
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
							id="ster"
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
				<v-btn
					type="submit"
				 	:disabled="!authentificationPermise ||
					this.courriel_vide ||
					this.courriel_invalide ||
						this.username_vide ||
						this.username_invalide ||
						this.password_vide ||
						this.confirmation_vide"
				>
					{{$t('inscription.boutonInscription')}}
				</v-btn>

			</div>
		</fieldset>
	</form>
</template>

<script src="./inscription.js" />
