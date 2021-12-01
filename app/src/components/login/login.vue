<template>
	<div class="container" id="login" >

		<tabs v-model="tabSélectionné">
			<tab :label="domaine" val="0" key="0">
				<div class="tab" :class="{activeTab: estActif('0')}" >
					DTI Rosemont
				</div>
			</tab>

			<tab label="Standard" val="1" key="1">
				<div class="tab" :class="{activeTab: estActif('1')}" >
					{{ $t('login.standard') }}
				</div>
			</tab>
			
			<tab label="Inscription" val="2" key="2">
				<div class="tab" :class="{activeTab: estActif('2')}" >
					{{ $t('login.inscription') }}
				</div>
			</tab>				
		</tabs>

		<tab-panels v-model="tabSélectionné" class="tab-panels">
						<tab-panel val="0" key="0" class="tab-panel">
							<LoginForm @onLogin="onLogin" :domaine="domaine"/>
							<br>
							<p>
							<a href="https://portail.dti.crosemont.quebec/pwm/public/forgottenpassword">Mot de passe oublié?</a>
							</p>
							

						</tab-panel>
					
						<tab-panel val="1" key="1" class="tab-panel">
							<LoginForm @onLogin="onLogin" />
						</tab-panel>

						<tab-panel val="2" key="2" class="tab-panel">
							<Inscription @onLogin="onLogin" />
						</tab-panel>
		</tab-panels>
	</div>
	
</template>

<script src="./login.js"></script>

<style scoped src="./login.css"></style>
