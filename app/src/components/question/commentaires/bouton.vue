<template>
	<div
		id="boutonmsg"
		:class="{ 'active' : menuOuvert }"
		@click.prevent="basculerMenuCommentaire"
	>
		<slot>
			<button
				type="button"
				class="boutonmsg-button"
				title="Menu"
			>
				<i class="fa fa-commenting-o" />
			</button>
		</slot>
	</div>
</template>

<script src="./bouton.js"></script>
<style src="./bouton.css"></style>
