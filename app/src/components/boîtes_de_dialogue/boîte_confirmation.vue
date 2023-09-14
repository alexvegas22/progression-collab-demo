<template>
	<div class="container">
		<v-dialog
			v-model="visible"
			persistent
			width="auto"
		>
			<v-card>
				<v-card-title
					class="headline grey lighten-2"
					primary-title
				>
					{{ titre }}
				</v-card-title>
				<v-card-text>
					{{ message }}
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						variant="text"
						@click="onNon"
					>
						{{ $t("dialogues.boiteDeDialogue.non") }}
					</v-btn>
					<v-btn
						color="success"
						variant="text"
						@click="onOui"
					>
						{{ $t("dialogues.boiteDeDialogue.oui") }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>	
</template>

<script src="./boîte_confirmation.js"></script>
