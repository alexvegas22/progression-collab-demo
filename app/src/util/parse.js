import hljs from "highlight.js";
import milt from "markdown-it-link-target";
import MarkdownIt from "markdown-it";
import MarkdownItImSize from "markdown-it-imsize";
import MarkdownItFootnote from "markdown-it-footnote";

var md = new MarkdownIt({
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
})
	.use(MarkdownItImSize)
	.use(MarkdownItFootnote)
	.use(milt, {
		target: "_blank"
	});



const parseMD = (data) => {
	if (!data) {
		return "";
	} else {
		return md.render(data);
	}
};

export default parseMD;
