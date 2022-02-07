<template>
	<div class="container" id="login" >
		<tabs v-model="tabSélectionné">
			<tab v-if="auth_ldap" :label="ldap_domaine" val="0" key="0" class="tab" :class="{activeTab: estActif('0')}" >
					{{ldap_domaine}}
			</tab>

			<tab v-if="auth_local" label="Standard" val="1" key="1" class="tab" :class="{activeTab: estActif('1')}" >
					{{ $t('login.standard') }}
			</tab>

			<tab v-if="auth_local || !auth_ldap" label="Inscription" val="2" key="2" class="tab" :class="{activeTab: estActif('2')}" >
					{{ $t('login.inscription') }}
			</tab>
		</tabs>

		<tab-panels v-model="tabSélectionné" :animate="true" >
			<tab-panel val="0" key="0" >
				<LoginForm @onLogin="onLogin" :domaine="ldap_domaine" :url_mdp_reinit="ldap_url_mdp_reinit"/>
			</tab-panel>

			<tab-panel val="1" key="1" >
				<LoginForm @onLogin="onLogin"/>
			</tab-panel>

			<tab-panel val="2" key="2" >
				<Inscription @onLogin="onLogin"  :password_req="auth_local" />
			</tab-panel>

		</tab-panels>
	</div>
</template>

<script src="./login.js"></script>

<style scoped src="./login.css"></style>
