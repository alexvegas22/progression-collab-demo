<template>
	<div id="thème">
		{{thème.titre}}
	</div>
</template>


<script>
 export default {
	 name: 'Thème',
	 props: {
		 thème: Object
	 }
 }
</script>
