<template>
	<div
		v-shortkey=raccourcis.sauvegarde
		@shortkey="sauvegarder"
	>
		<div class="container p-0 xray">

			<v-btn-toggle
				density="compact"
				v-model="xray">
			
				<v-btn
					value="true"
					flat
					size="small"
					:title="$t('editeur.xray')"
				>
					<v-icon
						icon="mdi-sunglasses"
					/>
				</v-btn>
			</v-btn-toggle>

			<v-btn
				:disabled="!pressePapier"
				@click="copy"
				:loading="copié"
				flat
				size="small"
				:title="$t('editeur.copier')"
			>
				<v-icon
					icon="mdi-content-copy"
				/>
				<template #loader>
					{{$t('editeur.copié')}}
				</template>
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
