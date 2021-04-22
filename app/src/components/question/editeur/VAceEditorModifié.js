import ace from "ace-builds";
require("ace-builds/webpack-resolver");

import { capitalize, defineComponent, markRaw, h } from "vue";
import ResizeObserver from "resize-observer-polyfill";
const Events = ["blur", "input", "change", "changeSelectionStyle", "changeSession", "copy", "focus", "paste"];
export const VAceEditor = defineComponent({
	props: {
		value: {
			type: String,
			required: true
		},
		lang: {
			type: String,
			default: "text"
		},
		theme: {
			type: String,
			default: "chrome"
		},
		options: Object,
		placeholder: String,
		readonly: Boolean,
		wrap: Boolean,
		printMargin: {
			type: [Boolean, Number],
			default: true
		}
	},
	emits: ["update:value", "init", ...Events],
	render() {
		return h("div");
	},
	mounted() {
		const editor = (this._editor = markRaw(
			ace.edit(this.$el, {
				placeholder: this.placeholder,
				readOnly: this.readonly,
				value: this.value,
				mode: "ace/mode/" + this.lang,
				theme: "ace/theme/" + this.theme,
				wrap: this.wrap,
				printMargin: this.printMargin,
				useWorker: false,
				...this.options
			})
		));
		this._contentBackup = this.value;
		var Range = ace.require("ace/range").Range;
		var Anchor = ace.require("ace/anchor").Anchor;

		var document = editor.session.getDocument();

		var TODOPlus = editor.find("+TODO", {
			caseSensitive: true
		});
		var TODOMoin = editor.find("-TODO", {
			caseSensitive: true
		});

		var positionTODO = [new Anchor(document, TODOPlus.start.row, 0), new Anchor(document, TODOMoin.start.row, 0)];

		editor.commands.on("exec", function(e) {
			var position = editor.getCursorPosition();
			console.log(position);

			var zoneÉditable = Range.fromPoints(positionTODO[0], positionTODO[1]);

			if (position.row > zoneÉditable.start.row && position.row < zoneÉditable.end.row) {
				console.log("in éditable");
			} else {
				console.log("not éditable");
				e.preventDefault();
				e.stopPropagation();
			}
		});

		editor.on("change", () => {
			const content = editor.getValue();
			this._contentBackup = content;
			this.$emit("update:value", content);
		});
		Events.forEach(x => {
			const eventName = "on" + capitalize(x);
			if (typeof this.$.vnode.props[eventName] === "function") {
				editor.on(x, this.$emit.bind(this, x));
			}
		});
		this._ro = new ResizeObserver(() => editor.resize());
		this._ro.observe(this.$el);
		this.$emit("init", editor);
	},
	beforeUnmount() {
		var _a, _b;
		(_a = this._ro) === null || _a === void 0 ? void 0 : _a.disconnect();
		(_b = this._editor) === null || _b === void 0 ? void 0 : _b.destroy();
	},
	methods: {
		focus() {
			this._editor.focus();
		},
		blur() {
			this._editor.blur();
		},
		selectAll() {
			this._editor.selectAll();
		}
	},
	watch: {
		value(val) {
			if (this._contentBackup !== val) {
				this._editor.setValue(val, 1);
				this._contentBackup = val;
			}
		},
		lang(val) {
			this._editor.getSession().setMode("ace/mode/" + val);
		},
		theme(val) {
			this._editor.setTheme("ace/theme/" + val);
		},
		options(val) {
			this._editor.setOptions(val);
		},
		readonly(val) {
			this._editor.setReadOnly(val);
		},
		placeholder(val) {
			this._editor.setOption("placeholder", val);
		},
		wrap(val) {
			this._editor.setWrapBehavioursEnabled(val);
		},
		printMargin(val) {
			this._editor.setOption("printMargin", val);
		}
	}
});
//# sourceMappingURL=index.js.map
