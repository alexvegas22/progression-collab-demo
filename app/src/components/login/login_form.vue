
<template>
	<form
		name="login"
		class="form-horizontal"
		@submit.prevent="login"
	>
		<fieldset :disabled="!authentificationPermise">
			<v-row justify="center">
				<v-col
					cols="12"
					sm="10"
					md="8"
					lg="6"
				>
					<v-text-field
						:label="$t('login.identifiant')"
						v-model="identifiant"
						name="identifiant"
						variant="underlined"
						:rules="[identifiant_valide]"
					/>

					<v-text-field
						:label="$t('login.motDePasse')"
						v-model="password"
						name="passwd"
						type="password"
						variant="underlined"
					/>

					<div v-if="url_mdp_reinit">
						<a :href="url_mdp_reinit">{{ $t('login.mdpOublié') }}</a>
					</div>

					<v-checkbox
						:label="$t('login.persister')"
						v-model="persister"
						name="persister"
					/>
					<v-divider></v-divider>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							type="submit"
							color="success"
							:disabled="!authentificationPermise || !champs_valides"
						>
							{{$t('login.boutonConnexion')}}
							<v-icon icon="mdi-chevron-right" end></v-icon>
						</v-btn>
					</v-card-actions>
				</v-col>
			</v-row>
		</fieldset>
	</form>
</template>

<script src="./login_form.js"></script>
