import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./util/i18n";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";

import { plugin as VueTippy } from "vue-tippy";
import "tippy.js/dist/tippy.css"; // optional for styling

createApp(App)
	.use(router)
	.use(store)
	.use(i18n)
	.use(VueTippy, {
		component: "tippy",
		defaultProps: { placement: "bottom" },
	})
	.mount("#app");
