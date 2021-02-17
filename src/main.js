import { createApp, h } from 'vue';
import App from './App.vue'
import router from './router'

createApp({
	render: () => h(App),

	data: function() {
return {
		result:"",
		responseAvailable:false
	};
},

	methods: {
		fetch(){

		}
	}
}).use(router).mount('#app')
