<template>

    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-6 rounded-lg shadow-md w-80">
            <h1 class="text-2xl font-semibold mb-4">Register</h1>
            <form @submit.prevent="register">
                <input v-model="name" placeholder="Name" required
                    class="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input v-model="email" type="email" placeholder="Email" required
                    class="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input v-model="password" type="password" placeholder="Password" required
                    class="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input v-model="password_confirmation" type="password" placeholder="Confirm Password" required
                    class="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="submit"
                    class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200">
                    Register
                </button>
            </form>
            <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
// import { useRouter } from 'vue-router';

export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            error: null,
        };
    },
    methods: {
        async register() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                });
                localStorage.setItem('token', response.token); // Store token for later use
                // Redirect to clothlist page
                this.$router.push('/clothlist');

                // const router = useRouter();
                // router.push({ name: 'ClothList' });

                this.error = null; // Clear error message after successful registration
            } catch (error) {
                this.error = error;
                // this.error = error.response.message;
            }
        },
    },
};
</script>
