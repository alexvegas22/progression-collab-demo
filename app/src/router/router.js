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

router.beforeEach( (to, from, next ) => {
	//Si le user est déjà chargé, continue
	if(store.state.user){
		next();
		return;
	}

	//Si la page ne requiert pas de connexion, continue
	if (pages_sans_connexion.indexOf(to.name) != -1){
		next();
		return;
	}

	const username = store.state.username || sessionStorage.getItem("username") || localStorage.getItem("username");

	//Charge l'utilisateur et contitnue
 	const user = username && store.dispatch("récupérerUser", import.meta.env.VITE_API_URL + "/user/" + username)

	if(!user) {
		sessionStorage.removeItem("username");
		localStorage.removeItem("username");

		//redirige vers la page de Login
		next( { name: "LoginView",
				query: to.query,
				params: { origine: to.fullPath }
		});
		return;
	}
	next()
});

export default router;
