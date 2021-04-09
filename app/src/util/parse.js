const MarkDown = require('markdown-it')();

const parseMD = (data) => {
	if (!data) {
		return "";
	} else {
		return MarkDown.render(data);
	}
};

export default parseMD;
