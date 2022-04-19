import { createI18n } from "vue-i18n/index";

const messages = chargerMessagesLocalisés();

function chargerMessagesLocalisés() {
	const messages = {};

	const locales = import.meta.globEager("../locales/*.json");

	for(var key of Object.keys(locales)){
		const langueTrouvée = key.match(/([A-Za-z0-9-_]+)\./i);
		if (langueTrouvée && langueTrouvée.length > 1) {
			const locale = langueTrouvée[1];
			messages[locale] = locales[key];
		}
	}
	return messages;
}

function trouverLocalePréférée(languePréférée) {
	let langages = Object.getOwnPropertyNames(messages);
	return langages.includes(languePréférée) ? languePréférée : import.meta.env.VITE_I18N_LOCALE;
}

const i18n = new createI18n({
	locale: trouverLocalePréférée(navigator.language.split("-")[0]),
	fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE,
	messages: messages,
});

export default i18n;
