import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
	{
		path: "/login",
		name: "LoginView",
		component: () => import("@/views/login/login.vue"),
	},
	{
		path: "/question",
		name: "Question",
		props: true,
		component: () => import("@/views/question/question.vue"),
	},
	{
		path: "/:catchAll(.*)",
		name: "NotFound",
		component: () => import("@/views/erreurs/404NotFound.vue"),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
