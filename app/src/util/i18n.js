import { createI18n } from "vue-i18n/index";

const messages = chargerMessagesLocalisés();

function chargerMessagesLocalisés() {
	const messages = {};

	const locales = import.meta.glob("../locales/*.json", { as: "raw" });

	for(var key of Object.keys(locales)){
		const langueTrouvée = key.match(/([a-z]{2}(_[A-Z]{2})?)\./i);
		if (langueTrouvée && langueTrouvée.length > 1) {
			const locale = langueTrouvée[1];
			messages[locale] = JSON.parse(locales[key]);
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
