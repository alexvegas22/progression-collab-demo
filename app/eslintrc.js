module.exports = {
    "env": {
	"node": true,
	"es2021": true
    },
    "extends": [
	"eslint:recommended",
	"plugin:vue/vue3-recommended",
    ],
    "parserOptions": {
	"parser": "@babel/eslint-parser",
	"ecmaVersion": "latest",
	"sourceType": "module"
    },
    "plugins": [
	"vue",
	"smarter-tabs",
    ],
    "rules": {
		//JS
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"no-mixed-spaces-and-tabs": [
			"error",
			"smart-tabs"
		],
		"smarter-tabs/smarter-tabs": "error",
		//Vue
		"vue/multi-word-component-names": "off",
		"vue/html-indent": ["error", "tab", {"alignAttributesVertically": true}],
		"vue/v-on-event-hyphenation": "off",
		"vue/no-v-html": "error",
		"vue/attribute-hyphenation": "off"
	}
};
