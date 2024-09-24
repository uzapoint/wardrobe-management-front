import axios from "axios";
import { defineStore } from "pinia";

const REST_API_URL = "http://localhost:8000/api";

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
			const response = await axios.post(`${REST_API_URL}/login`, {
				email,
				password,
			});

			return response.data;
		},
		logout() {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			this.user = null;
			this.token = null;
		},
	},
});
