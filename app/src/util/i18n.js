import { createI18n } from "vue-i18n/index";

function chargerMessagesLocale() {
	const locales = require.context("../locales", true, /[A-Za-z0-9-_,\s]+\.json$/i);
	const messages = {};
	locales.keys().forEach(key => {
		const langueTrouvé = key.match(/([A-Za-z0-9-_]+)\./i);
		if (langueTrouvé && langueTrouvé.length > 1) {
			const locale = langueTrouvé[1];
			messages[locale] = locales(key);
		}
	});
	return messages;
}

function trouverLocale(langueNavigateur) {
	let langueTrouvé = null;
	let langages = Object.getOwnPropertyNames(chargerMessagesLocale());
	langages.forEach(langue => {
		if (langue === langueNavigateur) {
			langueTrouvé = langue;
		}
	});
	return langueTrouvé;
}

const i18n = new createI18n({
	locale: trouverLocale(navigator.language.split('-')[0]) || process.env.VUE_APP_I18N_LOCALE,
	fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
	messages: chargerMessagesLocale()
});

export default i18n;
