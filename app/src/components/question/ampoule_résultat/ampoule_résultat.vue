<template>
	<div v-if="feedback && feedback!=null && this.panneauAffiché===true">
		<div class="espace_ampoule_test">
			<Tippy
				ref="tippy"
				v-tippy="{ trigger: 'click', interactive: true }"
				:aria="true"
				:arrow="true"
				:show="conseilAffiché"
				placement="bottom"
				class="popup_conseil_test"
				@show="basculerAffichageConseil"
			>
				<a id="ampoule_test">
					<svg
						class="ampoule_test"
						présentation_étape="2.1"
					>
						<use xlink:href="../ampoule/svg_ampoule/light-bulb-invention-svgrepo-com.svg#Capa_1" />
					</svg>
				</a>

				<template #content>
					<svg class="ampoule_test_mini">
						<use xlink:href="../ampoule/svg_ampoule/light-bulb-invention-svgrepo-com.svg#Capa_1" />
					</svg>
					<span class="taille_police">{{ $t("retroaction_tentative.conseil") }}</span>
					<!-- eslint-disable -->
                        <div
                            class="feedback taille_police"
                            v-html="this.feedback"
                        />
                        <!-- eslint-enable -->
				</template>
			</Tippy>
		</div>
	</div>
</template>

<script src="./ampoule_résultat.js"></script>
<style src="./ampoule_résultat.css"></style>