<template>
	<div>
		<v-toolbar
			:color="$store.getters.thèmeSombre ? 'red' : 'white'"
			height="56px"
		>
			<v-btn v-show="rôleÉditeur"
				@click="basculerXray"
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
	</div>
</template>
<script src="./toolbar.js"></script>
