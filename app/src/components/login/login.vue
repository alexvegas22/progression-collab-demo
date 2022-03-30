<template>
	<div
		id="login"
		class="container"
	>
		<tabs v-model="tabSélectionné">
			<tab
				v-if="auth_ldap"
				key="k0"
				label="LDAP"
				val="LDAP"
				class="tab"
				:class="{activeTab: estActif('LDAP')}"
			>
				{{ ldap_domaine }}
			</tab>

			<tab
				v-if="auth_local"
				key="k1"
				label="STANDARD"
				val="STANDARD"
				class="tab"
				:class="{activeTab: estActif('STANDARD')}"
			>
				{{ $t('login.standard') }}
			</tab>

			<tab
				v-if="auth_local || !auth_ldap"
				key="k2"
				label="INSCRIPTION"
				val="INSCRIPTION"
				class="tab"
				:class="{activeTab: estActif('INSCRIPTION')}"
			>
				{{ $t('login.inscription') }}
			</tab>
		</tabs>

		<tab-panels
			:key="key_panneaux"
			v-model="tabSélectionné"
			:animate="animation"
		>
			<tab-panel
				key="k3"
				val="LDAP"
			>
				<LoginForm
					:domaine="ldap_domaine"
					:url_mdp_reinit="ldap_url_mdp_reinit"
					@onLogin="onLogin"
				/>
			</tab-panel>

			<tab-panel
				key="k4"
				val="STANDARD"
			>
				<LoginForm @onLogin="onLogin" />
			</tab-panel>

			<tab-panel
				key="k5"
				val="INSCRIPTION"
			>
				<Inscription
					:password_req="auth_local"
					@onLogin="onLogin"
				/>
			</tab-panel>
		</tab-panels>
	</div>
</template>

<script src="./login.js"></script>

<style scoped src="./login.css"></style>
