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
	//Redirige vers Question si le paramètre uri a été fourni
	if(to.name == "Home"){
		var urlParams = new URLSearchParams(to.query);

		if(urlParams.has("uri")){
			next( { name: "Question",
				query: to.query,
				params: { origine: to.fullPath } 
			});
		}
	}

	//Si le user est déjà chargé, continue
	if(store.state.user){
		next();
		return;
	}

	const username = store.state.username || sessionStorage.getItem("username") || localStorage.getItem("username");
	//Si un username n'est pas disponible
	if(!username){
		//et qu'il est requis
		if (pages_sans_connexion.indexOf(to.name) != -1){
			next();
			return;
		}
		else{
			//redirige vers la page de Login
			next( { name: "LoginView",
				query: to.query,
				params: { origine: to.fullPath } 
			});
			return;
		}
	}

	//Charge l'utilisateur et contitnue
	store.dispatch("récupérerUser", import.meta.env.VITE_API_URL + "/user/" + username)
		.then( () => next() )
		.catch( () => {
			sessionStorage.removeItem("username");
			localStorage.removeItem("username");
			//En cas de problème, si l'utilisateur est requis
			if (pages_sans_connexion.indexOf(to.name) != -1){
				next();
				return;
			}
			else {
				//redirige vers la page de Login
				next( { name: "LoginView",
					query: to.query,
					params: { origine: to.fullPath }
				});
				return;
			}
		});
});

export default router;
