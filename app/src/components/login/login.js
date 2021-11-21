import LoginForm from './login_form.vue';
import Inscription from './inscription.vue';

export default {
	components: {
		LoginForm,
		Inscription,
	},
	data() {
		return {
			domaine: process.env.VUE_APP_DOMAINE
		}
	},
	emits: {
		onLogin: Object,
	},
	methods: {
		onLogin(event){
			this.$emit("onLogin", event);
		}
	},
	
};
