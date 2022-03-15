import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import actions from "./store/actions.js";
import i18n from "./util/i18n";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Tabs from 'vue3-tabs';
import { createMetaManager, plugin as metaPlugin } from 'vue-meta'

import { plugin as VueTippy } from "vue-tippy";
import "tippy.js/dist/tippy.css"; // optional for styling
import Vue3Tour from 'vue3-tour';
import 'vue3-tour/dist/vue3-tour.css';

import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import frFR from '@kangc/v-md-editor/lib/lang/fr-FR';
VMdEditor.lang.use('fr-FR', frFR);
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs';
import 'prismjs/components/prism-json';
VMdEditor.use(vuepressTheme, {
	Prism,
});

const app = createApp(App)
	.use(router)
	.use(store)
	.use(i18n)
	.use(VueTippy, {
		component: "tippy",
		defaultProps: { placement: "bottom" },
	})
	.use(Tabs)
	.use(createMetaManager())
	.use(metaPlugin)
	.use(VMdEditor)
	.use(Vue3Tour)

const authentificationErreurHandler = function () {
	if ( router.currentRoute.value.name != 'LoginView' ) {
		router.push({
			name: 'LoginView',
			query: window.location.search,
			params: { origine: window.location.href }
		});
	}
};

const valider = async function(promesse) {
	return promesse
		.then((résultat) => {
			store.dispatch("setErreurs", null);
			return résultat;
		})
		.catch((erreur) => {
			if (erreur.response.status == 401) {
				authentificationErreurHandler(erreur)
			}
			else {
				store.dispatch("setErreurs", { détails: erreur });
			}
			throw erreur;
		});
}

actions.setValidateur( valider );

router.isReady().then( () => app.mount("#app"));
