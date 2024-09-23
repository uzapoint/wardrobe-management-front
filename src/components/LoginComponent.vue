<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-6 rounded-lg shadow-md w-80">
            <h1 class="text-2xl font-semibold mb-4">Login</h1>
            <form @submit.prevent="login">
                <input v-model="email" type="email" placeholder="Email" required
                    class="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input v-model="password" type="password" placeholder="Password" required
                    class="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="submit"
                    class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200">
                    Login
                </button>
            </form>
            <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
            error: null,
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/login', {
                    email: this.email,
                    password: this.password,
                });
                localStorage.setItem('token', response.token); // Store token for later use
                // Redirect or update UI after login
                this.$router.push('/clothes');
            } catch (error) {
                this.error = error;
            }
        },
    },
};
</script>
