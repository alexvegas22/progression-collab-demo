<template>
	<div>
		<label>Rétroaction {{feedback_label}}</label>
		<div class="row flex-grow-1">
			<v-md-editor
				v-model="feedback[feedback_index]"
				height="30%"
				mode="edit"
				left-toolbar="undo redo | bold italic strikethrough | quote ul ol | documentation"
				:toolbar="toolbar"
				right-toolbar=""
				@change="modifierFeedback(feedback_index)"
			>
			</v-md-editor>
		</div>
	</div>
</template>

<script src="./rétroaction.js"></script>