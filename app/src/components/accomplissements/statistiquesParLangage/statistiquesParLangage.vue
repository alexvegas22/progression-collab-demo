<template>
	<br><br><h2>{{ $t('accomplissements.titreGraphParLangage') }}</h2><br>
	<div>
		<pie-chart
			width="500px"
			legend="right"
			suffix="%"
			:data="this.récupérerRéussi()"
		/>
	</div>
</template>

<script src="./statistiquesParLangage.js"></script>
