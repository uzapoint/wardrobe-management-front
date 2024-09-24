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
			item: null,
			items: [],
		};
	},
	actions: {
		async getItems({ page = 1 } = {}) {
			const auth = useAuthStore();
			const items = await api.items.filter(auth.token, { page });
			this.items = items;
		},
		async getItem(id) {
			const auth = useAuthStore();
			const item = await api.items.get(auth.token, id);
			this.item = item;
		},
		async createItem(data) {
			const auth = useAuthStore();
			const item = await api.items.create(auth.token, data);
			if (item) {
				this.getItems();
			}
		},
		async updateItem(id, data) {
			const auth = useAuthStore();
			const item = await api.items.update(auth.token, id, data);
			if (item) {
				this.getItems();
				this.getItem(id);
			}
		},
		async deleteItem(id) {
			const auth = useAuthStore();
			const item = await api.items.delete(auth.token, id);
			if (item) {
				this.getItems();
				this.getItem(id);
			}
		},
	},
});
