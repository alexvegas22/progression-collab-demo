<template>
	<div class="container">
		<v-dialog
			v-model="dialog"
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
					{{ messageDeValidation }}
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="dark"
						variant="text"
						@click="onNon"
					>
						{{ choixNon }}
					</v-btn>
					<v-btn
						color="success"
							   variant="text"
							   @click="onOui"
					>
						{{ choixOui }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>	
</template>

<script src="./boite_de_dialogue.js"></script>
