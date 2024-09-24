import { createApp } from "vue";
import { createPinia } from "pinia";
import { createWebHashHistory, createRouter } from "vue-router";
import App from "./App.vue";
import { useAuthStore } from "./store";
import LoginPage from "./pages/LoginPage.vue";
import RegisterPage from "./pages/RegisterPage.vue";
import ForgotPassword from "./pages/ForgotPassword.vue";
import ResendVerificationEmail from "./pages/ResendVerificationEmail.vue";
import VerifyEmail from "./pages/VerifyEmail.vue";
import HomePAge from "./pages/HomePage.vue";
import ItemPage from "./pages/ItemPage.vue";
import EditItemPage from "./pages/EditItemPage.vue";
import CreateItemPage from "./pages/CreateItemPage.vue";
import "./main.css";
const app = createApp(App);

const pinia = createPinia();

const routes = [
	{
		name: "login",
		path: "/auth/login",
		component: LoginPage,
		meta: {
			requiresGuest: true,
		},
	},
	{
		path: "/auth/register",
		component: RegisterPage,
		meta: {
			requiresGuest: true,
		},
	},
	{
		path: "/auth/forgot-password",
		component: ForgotPassword,
		meta: {
			requiresGuest: true,
		},
	},
	{
		path: "/auth/resend-verfication-email",
		component: ResendVerificationEmail,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: "/auth/verify-email",
		component: VerifyEmail,
		meta: {
			requiresAuth: true,
		},
	},
	{
		name: "home",
		path: "/",
		component: HomePAge,
		meta: {
			requiresAuth: true,
			requiresVerified: true,
		},
	},
	{
		path: "/items/:id",
		component: ItemPage,
		meta: {
			requiresAuth: true,
			requiresVerified: true,
		},
	},
	{
		path: "/items/new",
		component: CreateItemPage,
		meta: {
			requiresAuth: true,
			requiresVerified: true,
		},
	},
	{
		path: "/items/:id/edit",
		component: EditItemPage,
		meta: {
			requiresAuth: true,
			requiresVerified: true,
		},
	},
];
const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

router.beforeEach((to) => {
	const auth = useAuthStore();

	if (to.meta.requiresAuth && !auth.isLoggedIn) return "/auth/login";
	// if (to.meta.requiresVerified && !auth.isVerified)
	// 	return "/auth/resend-verfication-email";
	if (to.meta.requiresGuest && auth.isLoggedIn) return "/";
});

app.use(pinia);
app.use(router);
app.mount("#app");
