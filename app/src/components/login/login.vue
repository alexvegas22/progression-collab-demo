<template>
	<div class="container" id="login" >

		<!-- Dans la version actuelle de BootstrapVue3, il semble
			 impossible de contrôler l'affichage conditionnel d'un tab seulement
			 On duplique l'ensemble des tabs pour contourner le problème
		-->
		<tabs v-model="tabSélectionné">
			<tab :label="domaine" val="0" key="0">
				<div class="tab" :class="{activeTab: estActif('0')}" >
					DTI Rosemont
				</div>
			</tab>

			<tab label="Standard" val="1" key="1">
				<div class="tab" :class="{activeTab: estActif('1')}" >
					Standard
				</div>
			</tab>
			
			<tab label="Inscription" val="2" key="2">
				<div class="tab" :class="{activeTab: estActif('2')}" >
					Inscription
				</div>
			</tab>				
		</tabs>

		<tab-panels v-model="tabSélectionné" class="tab-panels">
						<tab-panel val="0" key="0" class="tab-panel">
							<LoginForm @onLogin="onLogin" :domaine="domaine" />
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
