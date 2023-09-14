<template>
	<splitpanes ref="sp" :horizontal="h" @resized="resized" :dbl-click-splitter=false>
		<pane :size="pct_gauche" v-if="gauche!='caché'">
			<PanneauMinMax v-if='gauche!="fixe"' style="height:100%;" :horizontal="h" :size=px_gauche minsize="60" @resize="resize_gauche">
				<slot name="gauche" />
			</PanneauMinMax>
			<slot v-else name="gauche" />
		</pane>
		<pane :size="pct_droite" v-if="droite!='caché'">
			<PanneauMinMax v-if='droite!="fixe"' style="height:100%;" :horizontal="h" :size=px_droite minsize="60" @resize="resize_droite">
				<slot name="droite" />
			</PanneauMinMax>
			<slot v-else name="droite" />
		</pane>
	</splitpanes>
</template>

<script src="./diptyque.js"/>
