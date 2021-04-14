import { createI18n } from "vue-i18n/dist/vue-i18n.esm-bundler.js";

const messages = {
	'fr': {
		connexionCourriel: 'Courriel',
		connexionMotDePasse: 'Mot de passe',
	},
	'en': {
		connexionCourriel: 'Email',
		connexionMotDePasse: 'Password',
	},
}

const i18n = new createI18n({
	locale: 'fr',
	fallbackLocale: 'en',
	messages,
});

export default i18n;