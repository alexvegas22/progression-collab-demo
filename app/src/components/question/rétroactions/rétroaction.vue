<template>

			<label> Rétroaction positive </label>
			<div v-if="aperçu">
				<div class="row flex-grow-1">
					<v-md-editor v-model="positive" height="30%" mode="preview"></v-md-editor>
				</div>
			</div>
			<div v-else>
				<div class="row flex-grow-1">
					<v-md-editor
						v-model="positive"
						height="30%"
						mode="edit"
						left-toolbar="undo redo | bold italic strikethrough | quote ul ol | documentation"
						:toolbar="toolbar"
						right-toolbar=""
					>
					</v-md-editor>
				</div>
			</div>
			<label> Rétroaction négative</label>
			<div v-if="aperçu">
				<div class="row flex-grow-1">
					<v-md-editor v-model="négative" height="30%" mode="preview"></v-md-editor>
				</div>
			</div>
			<div v-else>
				<div class="row flex-grow-1">
					<v-md-editor
						v-model="négative"
						height="30%"
						mode="edit"
						left-toolbar="undo redo | bold italic strikethrough | quote ul ol | documentation"
						:toolbar="toolbar"
						right-toolbar=""
					>
					</v-md-editor>
				</div>
			</div>
			<label> Rétroaction erreur</label>
			<div v-if="aperçu">
				<div class="row flex-grow-1">
					<v-md-editor v-model="erreur" height="30%" mode="preview"></v-md-editor>
				</div>
			</div>
			<div v-else>
				<div class="row flex-grow-1">
					<v-md-editor
						v-model="erreur"
						height="30%"
						mode="edit"
						left-toolbar="undo redo | bold italic strikethrough | quote ul ol | documentation"
						:toolbar="toolbar"
						right-toolbar=""
					>
					</v-md-editor>
				</div>
			</div>


</template>

<script src="./rétroaction.js"></script>


<style scoped>

</style>