<template>
	<div class="container" id="login" >

		<!-- Dans la version actuelle de BootstrapVue3, il semble
			 impossible de contrôler l'affichage conditionnel d'un tab seulement
			 On duplique l'ensemble des tabs pour contourner le problème
		-->
		<div v-if="domaine">
		<b-card no-body>
			<b-tabs card>
				<b-tab :title="domaine" active>
					<b-card>
						<LoginForm @onLogin="onLogin" />
					</b-card>
				</b-tab>
				
				<b-tab title="Standard">
					<b-card>
						<LoginForm @onLogin="onLogin" />
					</b-card>
				</b-tab>

				<b-tab title="Inscription">
					<b-card>
						<Inscription @onLogin="onLogin" />
					</b-card>
				</b-tab>
			</b-tabs>
		</b-card>
		</div>

		<div v-else>
		<b-card no-body>
			<b-tabs card>
				<b-tab title="Standard">
					<b-card>
						<LoginForm @onLogin="onLogin" />
					</b-card>
				</b-tab>

				<b-tab title="Inscription">
					<b-card>
						<Inscription @onLogin="onLogin" />
					</b-card>
				</b-tab>
			</b-tabs>
		</b-card>
		</div>
		
	</div>
</template>

<script src="./login.js"></script>
