import axios from "axios";

const REST_API_URL = "http://localhost:8000/api";

const makeGetRequest = async (url, token = null, params = {}) => {
	const headers = {
		Accept: "application/json",
	};
	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}
	try {
		const response = await axios.get(url, {
			headers,
			params,
		});

		return response.data;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const makePostRequest = async (url, data = {}, token = null) => {
	try {
		const headers = {
			Accept: "application/json",
		};
		if (token) {
			headers["Authorization"] = `Bearer ${token}`;
		}

		let response = await axios.post(url, data, { headers });
		return response.data;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const makePutRequest = async (url, data = {}, token = null) => {
	try {
		const headers = {
			Accept: "application/json",
		};
		if (token) {
			headers["Authorization"] = `Bearer ${token}`;
		}

		let response = await axios.put(url, data, { headers });
		return response.data;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const makeDeleteRequest = async (url, token) => {
	try {
		const headers = {
			Accept: "application/json",
		};
		if (token) {
			headers["Authorization"] = `Bearer ${token}`;
		}
		let response = await axios.delete(url, { headers });
		return response.data;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export default {
	auth: {
		login(email, password) {
			return makePostRequest(`${REST_API_URL}/sanctum/token`, {
				email,
				password,
				device_name: "web",
			});
		},
		getUser(token) {
			return makeGetRequest(`${REST_API_URL}/user`, token);
		},
	},
	items: {
		filter(token, params = {}) {
			return makeGetRequest(`${REST_API_URL}/items`, token, params);
		},
		get(token, id) {
			return makeGetRequest(`${REST_API_URL}/items/${id}`, token);
		},
		create(token, data) {
			return makePostRequest(`${REST_API_URL}/items`, data, token);
		},
		update(token, id, data) {
			return makePutRequest(`${REST_API_URL}/items/${id}`, data, token);
		},
		delete(token, id) {
			return makeDeleteRequest(`${REST_API_URL}/items/${id}`, token);
		},
	},
};
