<template class="p-4">
	<div v-if="msgReponseApi != null" class="alert alert-warning alert-dismissible fade show" role="alert">
		<strong>{{ msgReponseApi }}</strong>
	</div>
	<div v-if="retroactionTentative">
		<div v-if="!tentativeEnCoursDeSoumission && msgReponseApi == null" class="p-2">
			<h3 v-if="retroactionTentative.réussi"><span style="color: green">Bonne réponse</span> 👍</h3>
			&nbsp;
			<h3 v-else><span style="color: red">Mauvaise réponse</span> 😢</h3>
			&nbsp;
			<h4>
				💡 Nombre de tests validés :
				<span style="color: green">
					<strong>{{ retroactionTentative.tests_réussis }} </strong>
				</span>
			</h4>
			&nbsp;
			<h4 v-if="retroactionTentative.feedback">
				💡 Conseil : <span style="color: orange" v-html="retroactionTentative.feedback"></span>
			</h4>
		</div>
	</div>
</template>

<script src="./retroaction_tentative.js"></script>
