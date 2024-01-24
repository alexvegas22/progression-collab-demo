import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index.js";

const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import("@/views/home/home.vue"),
	},
	{
		path: "/login",
		name: "LoginView",
		component: () => import("@/views/login/login.vue"),
		props : true,
	},
	{
		path: "/question",
		name: "Question",
		component: () => import("@/views/question/question.vue"),
	},
	{
		path: "/accomplissements",
		name: "Accomplissements",
		component: () => import("@/views/accomplissements/accomplissements.vue"),
	},
	{
		path: "/:catchAll(.+)",
		name: "NotFound",
		component: () => import("@/views/erreurs/404NotFound.vue"),
	},
];

const pages_sans_connexion = [ "Home", "LoginView" ];

const router = createRouter({
	history: createWebHistory(
		"/" + import.meta.env.VITE_SUBDIR
	),
	routes,
});

router.beforeEach( async function(to, from, next ){
	const config = store.getters.configServeur ?? await store.dispatch("récupérerConfigServeur", import.meta.env.VITE_API_URL);

	//Si le user est déjà chargé, continue
	if(store.state.user){
		next();
		return;
	}

	const username = store.state.username || sessionStorage.getItem("username") || localStorage.getItem("username");
	if(!username) {
		if(pages_sans_connexion.includes(to.name)){
			next();
		}
		else {
			//redirige vers la page de Login
			next( { name: "LoginView",
				    query: to.query,
				    params: { origine: to.fullPath }
			});
		}
		return;
	}

	//Charge l'utilisateur et continue

	try{
		await store.dispatch("récupérerUser", config.liens.user);
		//N'envoie pas au login si l'utilisateur est déjà connecté
		if( to.name=="LoginView" ) {
			next( { name:"Home" } );
		}
		else {
			next();
		}
	}
	catch {
		sessionStorage.removeItem("username");
		localStorage.removeItem("username");

		//redirige vers la page de Login
		next( { name: "LoginView",
		        query: to.query,
		        params: { origine: to.fullPath }
		      });
	}
});

export default router;
