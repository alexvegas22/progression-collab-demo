import LoginForm from './login_form.vue';
import Inscription from './inscription.vue';

import {reactive, toRefs} from 'vue';

export default {
	components: {
		LoginForm,
		Inscription,
	},
	data(){
		return {
			tabSélectionné: "2",
		}
	},
	computed: {
		config_serveur(){
			return this.$store.getters.configServeur;
		},
		auth_local(){
			return this.config_serveur.AUTH.LOCAL;
		},
		auth_ldap(){
			return this.config_serveur.AUTH.LDAP;
		},
		ldap_domaine(){
			return this.config_serveur.AUTH.LDAP ? this.config_serveur.LDAP.DOMAINE : "";
		},
		ldap_url_mdp_reinit(){
			return this.config_serveur.AUTH.LDAP ? this.config_serveur.LDAP.URL_MDP_REINIT : "";
		},
	},
	emits: {
		onLogin: Object,
	},
	methods: {
		onLogin(event){
			this.$emit("onLogin", event);
		},
		estActif(tab) {
			return this.tabSélectionné === tab;
		}		
	},
};
