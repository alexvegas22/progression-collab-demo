import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./util/i18n";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import VueTippy from "vue-tippy";

createApp(App).use(router).use(store).use(i18n).use(VueTippy).mount("#app");
