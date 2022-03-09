<template>
	<div class="container" id="login">
		<tabs v-model="tabSélectionné" >
			<tab v-if="auth_ldap" label="LDAP" val="LDAP" key="k0" class="tab" :class="{activeTab: estActif('LDAP')}" >
					{{ldap_domaine}}
			</tab>

			<tab v-if="auth_local" label="STANDARD" val="STANDARD" key="k1" class="tab" :class="{activeTab: estActif('STANDARD')}" >
					{{ $t('login.standard') }}
			</tab>

			<tab v-if="auth_local || !auth_ldap" label="INSCRIPTION" val="INSCRIPTION" key="k2" class="tab" :class="{activeTab: estActif('INSCRIPTION')}" >
					{{ $t('login.inscription') }}
			</tab>
		</tabs>

		<tab-panels v-model="tabSélectionné" :animate="animation" :key="key_panneaux">
			<tab-panel val="LDAP" key="k3" >
				<LoginForm @onLogin="onLogin" :domaine="ldap_domaine" :url_mdp_reinit="ldap_url_mdp_reinit"/>
			</tab-panel>

			<tab-panel val="STANDARD" key="k4" >
				<LoginForm @onLogin="onLogin"/>
			</tab-panel>

			<tab-panel val="INSCRIPTION" key="k5" >
				<Inscription @onLogin="onLogin"  :password_req="auth_local" />
			</tab-panel>

		</tab-panels>
	</div>
</template>

<script src="./login.js"></script>

<style scoped src="./login.css"></style>
