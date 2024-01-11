import LoginForm from "./login_form.vue";
import Inscription from "./inscription.vue";

export default {
	components: {
		LoginForm,
		Inscription,
	},
	props: {
		ongletSélectionné: null,
	},
	data(){
		return {
			sélection: null,
			key_panneaux: 1,
			animation: true
		};
	},
	watch: {
		ongletSélectionné() {
			if(this.ongletSélectionné) {
				this.sélection = this.ongletSélectionné;
			}
		}
	},
	computed: {
		tabSélectionné: {
			get(){
				return this.sélection ?? (this.auth_ldap ? "LDAP" : !this.auth_ldap && this.auth_local ? "STANDARD" : "INSCRIPTION");
			},
			set(val){
				this.sélection=val;
			}
		},
		config_serveur(){
			return this.$store.getters.configServeur;
		},
		inscription_locale(){
			return this.$store.getters.configServeur.liens.inscrire;
		},
		auth_local(){
			return this.config_serveur.AUTH.LOCAL;
		},
		auth_ldap(){
			return this.config_serveur.AUTH.LDAP;
		},
		ldap_domaine(){
			return this.config_serveur.LDAP ? this.config_serveur.LDAP.DOMAINE ?? "" : "";
		},
		ldap_url_mdp_reinit(){
			return this.config_serveur.LDAP ? this.config_serveur.LDAP.URL_MDP_REINIT ?? "" : "";
		},
	},
	emits: {
		onInscrire: Object,
		onLogin: Object,
	},
	mounted(){
		//Hack pour contourner un bogue d'affichage sur Windows/Chrome
		//https://git.dti.crosemont.quebec/progression/progression_frontend/-/issues/69
		if(! this.config_serveur.AUTH.LOCAL && !this.config_serveur.AUTH.LDAP){
			this.animation=false;
			setTimeout(()=>{
				this.key_panneaux+=1;
			},100);
		}
	},
	methods: {
		onLogin(event){
			this.$emit("onLogin", event);
		},
		onInscrire(event){
			this.$emit("onInscrire", event);
			this.sélection = "STANDARD"; 
		},
		estActif(tab) {
			return this.tabSélectionné === tab;
		}
	},
};
