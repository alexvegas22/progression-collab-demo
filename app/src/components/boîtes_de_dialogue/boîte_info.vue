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
						color="primary"
						@click="onContinuer"
					>
						{{ $t("dialogues.boiteDeDialogue.continuer") }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>	
</template>

<script src="./boîte_info.js"></script>

