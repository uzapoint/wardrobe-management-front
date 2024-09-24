import { defineStore } from "pinia";
import api from "./api";

export const useAuthStore = defineStore("auth", {
	state: () => {
		const token = localStorage.getItem("token");
		const userSring = localStorage.getItem("user");
		const user = userSring ? JSON.parse(userSring) : null;

		return { token, user };
	},
	getters: {
		isVerified: (state) => {
			if (state.user?.email_verified_at) {
				return true;
			}

			return false;
		},
		isLoggedIn: (state) => {
			if (state.token) {
				return true;
			}

			return false;
		},
	},
	actions: {
		async login(email, password) {
			const { token } = await api.auth.login(email, password);

			localStorage.setItem("token", token);

			this.token = token;

			const user = await api.auth.getUser(token);

			if (!user) return false;

			localStorage.setItem("user", JSON.stringify(user));

			this.user = user;

			return user;
		},
		logout() {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			this.user = null;
			this.token = null;
		},
	},
});

export const useItemStore = defineStore("items", {
	state: () => {
		return {
			items: [],
		};
	},
	actions: {
		addProduct(product) {
			this.items.push(product);
		},
		removeProduct(product) {
			this.items = this.items.filter((item) => item.id !== product.id);
		},
	},
});
