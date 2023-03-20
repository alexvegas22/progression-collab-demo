<template>
	<div
		v-shortkey=raccourcis.sauvegarde
		@shortkey="sauvegarder"
	>
		<div class="container p-0 xray">
			<div
				v-if="rôleÉditeur"
				class="row align-items-end"
				style="height: 1.5rem"
			>
				<div
					class="col-auto"
				>
					<div class="form-check form-switch btn-xray">
						<input
							id="btn_xray"
							v-model="xray"
							class="form-check-input"
							type="checkbox"
							name="btn_xray"
						>
						<label
							class="form-check-label"
							for="btn_xray"
						>Tout voir</label>
					</div>
				</div>
			</div>
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
