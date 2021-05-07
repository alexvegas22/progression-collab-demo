const MarkDown = require("markdown-it")(
	{
		// Évite les attaques XSS qui pourraient être introduites dans des questions malveillantes.
		html: false,
	}
);

const parseMD = (data) => {
	if (!data) {
		return "";
	} else {
		return MarkDown.render(data);
	}
};

export default parseMD;
