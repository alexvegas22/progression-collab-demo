<template>
    <div id="thèmes">
        <ul>
			<li>Premier</li>
            <li v-for="thème in thèmes"> <Thème :thème="thème" /></li>
        </ul>
    </div>
</template>

<script>
 import Thème from './Thème.vue';
 import get_thèmes from '../util/thèmes';
 export default {
     name: 'Thèmes',
	 components: {
		 Thème
	 },
     data() {
         return { thèmes: [] }
     },
	 created() {
 		 get_thèmes().then(
 			 thèmes => {
 				 this.thèmes = thèmes;
 			 }
 		 ).catch(
 			 err => {
				 console.log(err)
			 }
 		 )
	 }
 }
</script>
