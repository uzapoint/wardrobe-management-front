import axios from 'axios';

const API_URL = axios.defaults.baseURL || "http://localhost:8003/api/";

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'auth/login', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'auth/register', {
            username: user.username,
            email: user.email,
            password: user.password,
            name: user.name,
            phone_number: user.phone_number,
            gender: user.gender,
        });
    }
}

export default new AuthService();