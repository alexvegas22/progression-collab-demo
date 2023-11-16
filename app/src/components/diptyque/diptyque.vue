<template>
	<splitpanes ref="sp" :horizontal="h" @resized="resized" :dbl-click-splitter=false >
		<pane :size="pct_gauche" v-if="gauche!='caché'" :class="[{horizontal: h}, {vertical: !h}]">
			<PanneauMinMax v-if='gauche!="fixe" || entête_gauche' :icon_size='gauche!="fixe"?16:0' :horizontal="h" :size=px_gauche minsize="60" @resize="resize_gauche"
			>
				<template #entête>
					<slot name="entête_gauche"/>
				</template>
				<slot
					name="gauche" />
			</PanneauMinMax>
			<div v-else class="bordure_panneau">
				<slot name="gauche" />
			</div>
		</pane>
		<pane :size="pct_droite" v-if="droite!='caché'" :class="[{horizontal: h}, {vertical: !h}]">
			<PanneauMinMax v-if='droite!="fixe" || entête_droite' :icon_size='droite!="fixe"?16:0' :horizontal="h" :size=px_droite minsize="60" @resize="resize_droite"
			>
				<template #entête>
					<slot name="entête_droite"/>
				</template>
				<slot name="droite" />
			</PanneauMinMax>
			<div v-else class="bordure_panneau">
				<slot name="droite"/>
			</div>
		</pane>
	</splitpanes>
</template>

<script src="./diptyque.js"/>
<style scoped src="./diptyque.css" />
