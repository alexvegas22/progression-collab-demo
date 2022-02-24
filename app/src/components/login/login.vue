<template>
	<div class="container thème_sombre_login" id="login">
		<tabs v-model="tabSélectionné">
			<tab v-if="auth_ldap" :label="ldap_domaine" val="LDAP" key="0" class="tab" :class="{activeTab: estActif('LDAP')}" >
					{{ldap_domaine}}
			</tab>

			<tab v-if="auth_local" label="Standard" val="STANDARD" key="1" class="tab" :class="{activeTab: estActif('STANDARD')}" >
					{{ $t('login.standard') }}
			</tab>

			<tab v-if="auth_local || !auth_ldap" label="Inscription" val="INSCRIPTION" key="2" class="tab" :class="{activeTab: estActif('INSCRIPTION')}" >
					{{ $t('login.inscription') }}
			</tab>
		</tabs>

		<tab-panels v-model="tabSélectionné" :animate="true" >
			<tab-panel val="LDAP" key="0" >
				<LoginForm @onLogin="onLogin" :domaine="ldap_domaine" :url_mdp_reinit="ldap_url_mdp_reinit"/>
			</tab-panel>

			<tab-panel val="STANDARD" key="1" >
				<LoginForm @onLogin="onLogin"/>
			</tab-panel>

			<tab-panel val="INSCRIPTION" key="2" >
				<Inscription @onLogin="onLogin"  :password_req="auth_local" />
			</tab-panel>

		</tab-panels>
	</div>
</template>

<script src="./login.js"></script>

<style scoped src="./login.css"></style>
