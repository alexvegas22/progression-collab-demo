<template>
	<div class="container">
		<v-dialog
			v-model="dialogueVisible"
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
						color="dark"
						variant="text"
						@click="onNon"
					>
						{{ non }}
					</v-btn>
					<v-btn
						color="success"
						variant="text"
						@click="onOui"
					>
						{{ oui }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>	
</template>

<script src="./boîte_confirmation.js"></script>
