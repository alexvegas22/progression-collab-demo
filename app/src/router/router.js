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
		path: "/:catchAll(.+)",
		name: "NotFound",
		component: () => import("@/views/erreurs/404NotFound.vue"),
	},
	{
		path: "/accomplissements",
		name: "accomplissements",
		component: () => import("@/views/accomplissements/accomplissements.vue"),

	}
	
];

const router = createRouter({
	history: createWebHistory(
		"/" + process.env.VUE_APP_SUBDIR
	),
	routes,
});

router.beforeEach( (to, from, next ) => {
	//Redirige vers Question si le paramètre uri a été fourni
	if(to.name == 'Home'){
		var urlParams = new URLSearchParams(to.query);

		if(urlParams.has('uri')){
			next( {name: 'Question',
				   query: to.query,
				   params: { origine: to.fullPath } 
			});
		}
	}

	//Pour toutes les autres routes, continue
	if(to.name != 'Question') {
		next();
		return;
	}

	//Si l'utilisateur est déjà changé, continue
	if(store.state.user){
		next();
		return;
	}

	const username = store.state.username || sessionStorage.getItem("username") || localStorage.getItem("username");
	//Si un username n'est pas disponible, redirige vers la page de Login
	if(!username){
		next( {name: 'LoginView',
			   query: to.query,
			   params: { origine: to.fullPath } 
		});
		return;
	}

	//Charge l'utilisateur et contitnue
	store.dispatch("getUser", process.env.VUE_APP_API_URL + "/user/" + username)
		 .then( () => next() )
		 .catch( () =>{
			 //En cas de problème, redirige vers la page de Login
			 next( {name: 'LoginView',
					query: to.query,
					params: { origine: to.fullPath } 
			 });
		 });
});

export default router;
