<template>
	<splitpanes ref="sp" :horizontal="h" @resized="resized" :dbl-click-splitter=false>
		<pane :size="pct_gauche">
			<PanneauMinMax v-if='gauche=="true"' style="height:100%;" :horizontal="h" :size=px_gauche minsize="32" @resize="resize_gauche">
				<slot name="gauche" />
			</PanneauMinMax>
			<slot v-else name="gauche" />
		</pane>
		<pane :size="pct_droite">
			<PanneauMinMax v-if='droite=="true"' style="height:100%;" :horizontal="h" :size=px_droite minsize="32" @resize="resize_droite">
				<slot name="droite" />
			</PanneauMinMax>
			<slot v-else name="droite" />
		</pane>
	</splitpanes>
</template>

<script src="./diptyque.js"/>
