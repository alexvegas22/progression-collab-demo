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
		beforeEnter: (to, from, next ) => {
			const username = store.state.username || sessionStorage.getItem("username") || localStorage.getItem("username");
			if(!store.state.user && username){
				store.dispatch("getUser", process.env.VUE_APP_API_URL + "/user/" + username)
					   .then( () => next() )
					   .catch( () =>{
						   next( {name: 'LoginView',
								  query: to.query,
								  params: { origine: to.fullPath } 
						   });
					   });
			}
			else if(!username){
				next( {name: 'LoginView',
					   query: to.query,
					   params: { origine: to.fullPath } 
				});

			}
			else{
				next();
			}
		},
	},
	{
		path: "/:catchAll(.+)",
		name: "NotFound",
		component: () => import("@/views/erreurs/404NotFound.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});



export default router;
