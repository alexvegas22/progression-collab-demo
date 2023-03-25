<template>
	<div
		v-shortkey=raccourcis.sauvegarde
		@shortkey="sauvegarder"
	>
		<div style="position:absolute;top:0px;left:0px;z-index:9999">X:{{xray}}</div>
		<div class="container p-0 xray">

			<v-btn-toggle
				density="compact"
				v-model="xray">
			
				<v-btn
					value="true">
					<v-icon
						icon="mdi-sunglasses"
					/>
				</v-btn>
			</v-btn-toggle>
				<v-btn
					@click="copy"
				>
					<v-icon
						icon="mdi-content-copy"
					/>
				</v-btn>						

		</div>
		
		<div
			class="indicateur_sauvegarde"
		>
			<v-icon
				:icon="icone_sauvegarde"
				size="1rem"
			/>
		</div>
		<Codemirror
			id="editor"
			ref="editor"
			présentation_étape="1.1"
			:value="code"
			:options="cmOptions"
			@ready="onReady"
		/>
		
	</div>
</template>

<script src="./editeur.js"></script>
<style src="./editeur.css"></style>
