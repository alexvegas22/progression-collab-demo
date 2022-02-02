<template>
	<div class="container" id="login" >
		<tabs v-model="tabSélectionné">
			<div  v-if="auth_ldap">
				<tab :label="ldap_domaine" val="0" key="0">
					<div class="tab" :class="{activeTab: estActif('0')}" >
						{{ldap_domaine}}
					</div>
				</tab>
			</div>

			<div v-if="auth_local">
				<tab label="Standard" val="1" key="1">
					<div class="tab" :class="{activeTab: estActif('1')}" >
						{{ $t('login.standard') }}
					</div>
				</tab>
			</div>
			
			<div v-if="auth_local">
				<tab label="Inscription" val="2" key="2">
					<div class="tab" :class="{activeTab: estActif('2')}" >
						{{ $t('login.inscription') }}
					</div>
				</tab>
			</div>
		</tabs>

		<tab-panels v-model="tabSélectionné" class="tab-panels">
			<tab-panel val="0" key="0" class="tab-panel">
				<LoginForm @onLogin="onLogin" :domaine="ldap_domaine" :url_mdp_reinit="ldap_url_mdp_reinit" :password_req="true" />
			</tab-panel>
			
			<tab-panel val="1" key="1" class="tab-panel">
				<LoginForm @onLogin="onLogin" :password_req="password_req" />
			</tab-panel>

			<tab-panel val="2" key="2" class="tab-panel">
				<Inscription @onLogin="onLogin" />
			</tab-panel>
		</tab-panels>
	</div>
	
</template>

<script src="./login.js"></script>

<style scoped src="./login.css"></style>
