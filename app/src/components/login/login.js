import LoginForm from './login_form.vue';
import Inscription from './inscription.vue';

export default {
	components: {
		LoginForm,
		Inscription,
	},
	data(){
		return {
			sélection: null
		};
	},
	computed: {
		tabSélectionné: {
			get(){
				if(this.sélection) return this.sélection;

				return this.auth_ldap ? "LDAP" : !this.auth_ldap && this.auth_local ? "STANDARD" : "INSCRIPTION"
			},
			set(val){
				this.sélection=val;
			}
		},
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
