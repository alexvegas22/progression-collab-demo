<template>
	<div
		v-shortkey=raccourcis.sauvegarde
		@shortkey="sauvegarder"
	>
		<v-toolbar
			:color="$store.getters.thèmeSombre ? '#353535' : 'white'"
			height="56px"
			class="xray"
		>
			<v-btn v-show="rôleÉditeur"
				@click="() => {xray = !xray}"
				value="true"
				size="small"
				rounded="0"
				:title="$t('editeur.xray')"
			>
				<v-icon
					:icon="xray ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
				/>
			</v-btn>

			<v-btn v-show="rôleÉditeur"
				:disabled="!pressePapier"
				@click="copy"
				:loading="copié"
				flat
				size="small"
				rounded="0"
				:title="$t('editeur.copier')"
			>
				<v-icon
					icon="mdi-content-copy"
				/>
				<template #loader>
					{{$t('editeur.copié')}}
				</template>
			</v-btn>

		</v-toolbar>
		
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
