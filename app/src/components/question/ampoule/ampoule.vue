<template>
	<div v-if="retroactionTentative && retroactionTentative.feedback">
		<div v-if="!estRétroactionTest">
			<teleport to="#carre-editeur">
				<div class="espace-ampoule">
					<Tippy
						ref="tippy"
						v-tippy="{ trigger: 'click', interactive: true }"
						:aria="true"
						:show-on-create="true"
						:arrow="true"
						:show="conseilAffiché"
						placement="bottom"
						class="popup_conseil"
						@show="basculerAffichageConseil"
					>
						<a id="btn_conseil">
							<svg
								class="svg_ampoule"
								présentation_étape="2.1"
							>
								<use xlink:href="./svg_ampoule/light-bulb-invention-svgrepo-com.svg#Capa_1" />
							</svg>
						</a>

						<template #content>
							<svg class="svg_ampoule_mini">
								<use xlink:href="./svg_ampoule/light-bulb-invention-svgrepo-com.svg#Capa_1" />
							</svg>
							{{ $t("retroaction_tentative.conseil") }}
							<!-- eslint-disable -->
								<div
									class="feedback"
									v-html="retroactionTentative.feedback"
								/>
								<!-- eslint-enable -->
						</template>
					</Tippy>
				</div>
			</teleport>
		</div>
		<div v-else>
			<div v-if="(feedback && feedback!=null && feedback!='' && this.panneauAffiché===true)">
				<div class="espace_ampoule_test">
					<Tippy
						ref="tippy"
						v-tippy="{ trigger: 'click', interactive: true }"
						:aria="true"
						:arrow="true"
						:show="conseilAffiché"
						placement="bottom"
						class="popup_conseil"
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
		</div>
	</div>
</template>

<script src="./ampoule.js"></script>
<style src="./ampoule.css"></style>