import { __decorate, __metadata } from "tslib";
import CodeMirror from "codemirror";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/mode/clike/clike/";
import "codemirror/mode/python/python";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import { capitalize, h, markRaw } from "vue";
import ResizeObserver from "resize-observer-polyfill";
import { $theme } from "theme-helper";
import { Component, Inreactive, Prop, VueComponentBase, Watch } from "vue3-component-base";
import { zones } from "./zones";

const Events = ["focus", "blur", "scroll"];
var VCodeMirrorComp;

let VCodeMirror = (VCodeMirrorComp = class VCodeMirror extends VueComponentBase {
	render() {
		return h("div", { class: "v-code-mirror" });
	}

	mounted() {
		const editor = (this.editor = markRaw(
			CodeMirror(this.$el, {
				value: this.value,
				mode: this.mode,
				theme: this.theme,
				readOnly: this.readonly,
				lineWrapping: this.wrap,
				lineNumbers: true,
				indentUnit: 4,
				extraKeys: { Tab: "indentAuto" },
				foldGutter: true,
				gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
				...this.options,
				indentUnit: 4,
				extraKeys: { Tab: "indentAuto" },
			})
			));

		this.$el._component = this;

		zones.cacherHorsVisible(editor.doc);
		zones.désactiverHorsTodo(editor.doc);

		editor.on("changes", () => {
			this.$emit("update:value", this.editor.getValue());
		});

		Events.forEach((x) => {
			const eventName = "on" + capitalize(x);
			if (typeof this.$.vnode.props[eventName] === "function") {
				editor.on(x, this.$emit.bind(this, x));
			}
		});

		this.cleanEvent = markRaw(
			$theme.onchange(({ detail }) => {
				this.editor.setOption("theme", detail === "white" ? "default" : "dracula");
			}),
		);

		if (!VCodeMirrorComp.ro) {
			VCodeMirrorComp.ro = new ResizeObserver(function (entries) {
				entries.forEach((entry) => {
					const that = entry.target._component;
					if (that.autoHeight) {
						that.editor.refresh();
					} else {
						that.editor.setSize(entry.contentRect.width, entry.contentRect.height);
					}
				});
			});
		}
		VCodeMirrorComp.ro.observe(this.$el);
		this.updateMode(this.mode);
	}

	beforeUnmount() {
		var _a, _b;
		(_a = this.cleanEvent) === null || _a === void 0 ? void 0 : _a.call(this);
		(_b = VCodeMirrorComp.ro) === null || _b === void 0 ? void 0 : _b.unobserve(this.$el);
	}

	updateValue(value) {
		if (value != this.editor.getValue()) {
			var cursor = this.editor.getCursor();
			this.editor.setValue(value);
			zones.cacherHorsVisible(this.editor.doc);
			zones.désactiverHorsTodo(this.editor.doc);
			this.editor.setCursor(cursor);
		}
	}

	updateMode(value) {
		if (value === "java") {
			this.editor.setOption("mode", "text/x-java");
		} else if (value === "python") {
			this.editor.setOption("mode", value);
		} else if (["c", "cpp", "c++"].includes(value)) {
			this.editor.setOption("mode", value);
		} else {
			this.editor.setOption("mode", null);
		}
	}

	updateReadonly(value) {
		this.editor.setOption("readOnly", value);
	}

	updateWrap(value) {
		this.editor.setOption("lineWrapping", value);
	}

	focus() {
		this.editor.focus();
	}
});
__decorate([Prop({ required: true }), __metadata("design:type", String)], VCodeMirror.prototype, "value", void 0);
__decorate([Prop({ default: null }), __metadata("design:type", String)], VCodeMirror.prototype, "mode", void 0);
__decorate([Prop(), __metadata("design:type", String)], VCodeMirror.prototype, "theme", void 0);
__decorate([Prop(), __metadata("design:type", Boolean)], VCodeMirror.prototype, "readonly", void 0);
__decorate([Prop({ default: true }), __metadata("design:type", Boolean)], VCodeMirror.prototype, "wrap", void 0);
__decorate([Prop(), __metadata("design:type", Object)], VCodeMirror.prototype, "options", void 0);
__decorate([Prop(), __metadata("design:type", Boolean)], VCodeMirror.prototype, "autoHeight", void 0);
__decorate([Inreactive, __metadata("design:type", Object)], VCodeMirror.prototype, "editor", void 0);
__decorate([Inreactive, __metadata("design:type", String)], VCodeMirror.prototype, "backupValue", void 0);
__decorate([Inreactive, __metadata("design:type", Function)], VCodeMirror.prototype, "cleanEvent", void 0);

__decorate(
	[
		Watch("value"),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", [String]),
		__metadata("design:returntype", void 0),
	],
	VCodeMirror.prototype,
	"updateValue",
	null,
);
__decorate(
	[
		Watch("mode"),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", [String]),
		__metadata("design:returntype", void 0),
	],
	VCodeMirror.prototype,
	"updateMode",
	null,
);
__decorate(
	[
		Watch("readonly"),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", [Boolean]),
		__metadata("design:returntype", void 0),
	],
	VCodeMirror.prototype,
	"updateReadonly",
	null,
);
__decorate(
	[
		Watch("wrap"),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", [Boolean]),
		__metadata("design:returntype", void 0),
	],
	VCodeMirror.prototype,
	"updateWrap",
	null,
);
VCodeMirror = VCodeMirrorComp = __decorate(
	[
		Component({
			name: "VCodeMirror",
			emits: ["update:value", ...Events],
		}),
	],
	VCodeMirror,
);
export { VCodeMirror };
