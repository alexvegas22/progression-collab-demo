var hljs = require("highlight.js"); // https://highlightjs.org/

// Actual default values
var md = require("markdown-it")({
	highlight: function (str, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return (
					"<pre class=\"hljs\"><code>" +
					hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
					"</code></pre>"
				);
			} catch (e) {
				console.log(e);
			}
		}

		return "<pre class=\"hljs\"><code>"  + md.utils.escapeHtml(str) + "</code></pre>";
	},
	// Évite les attaques XSS qui pourraient être introduites dans des questions malveillantes.
	html: false,
});

const parseMD = (data) => {
	if (!data) {
		return "";
	} else {
		return md.render(data);
	}
};

export default parseMD;
