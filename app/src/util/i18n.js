import { createI18n } from "vue-i18n";

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

function getLocaleDéfaut() {
	let langages = Object.getOwnPropertyNames(messages);

	const langueNavigateur = navigator.language.split("-")[0];

	if (langages.includes(langueNavigateur) )
		return langueNavigateur;
	else
		import.meta.env.VITE_I18N_LOCALE;
}

function sélectionnerLocale( locale ){
	let langages = Object.getOwnPropertyNames(messages);

	return langages.includes( locale ) ? locale : getLocaleDéfaut();
}

function créeri18n() {
	return new createI18n({
		locale: getLocaleDéfaut(),
		fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE,
		messages: messages,
	});
}

const i18n = créeri18n();

export {
	sélectionnerLocale,
	i18n,
};
