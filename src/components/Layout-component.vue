<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
      <div class="container">
        <a class="navbar-brand" href="/">
          {{ appName }}
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto"></ul>

          <ul class="navbar-nav ms-auto">
            <li v-if="!isAuthenticated" class="nav-item">
              <router-link v-if="loginRoute" class="nav-link" :to="loginRoute">{{ __('Login') }}</router-link>
            </li>
            <li v-if="!isAuthenticated" class="nav-item">
              <router-link v-if="registerRoute" class="nav-link" :to="registerRoute">{{ __('Register') }}</router-link>
            </li>
            <li v-if="isAuthenticated" class="nav-item dropdown">
              <a
                id="navbarDropdown"
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{ userName }}
              </a>
              <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" :to="logoutRoute" @click.prevent="logout">
                  {{ __('Logout') }}
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="py-4">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appName: 'Wardrobe Management System', // Update with your app name
    };
  },
  computed: {
    isAuthenticated() {
      return !!this.$store.state.user; // Assuming you store user info in Vuex
    },
    userName() {
      return this.$store.state.user ? this.$store.state.user.name : '';
    },
    loginRoute() {
      return this.$route.name === 'login' ? null : { name: 'login' };
    },
    registerRoute() {
      return this.$route.name === 'register' ? null : { name: 'register' };
    },
    logoutRoute() {
      return { name: 'logout' }; // Ensure your logout route is defined
    },
  },
  methods: {
    logout() {
      // Implement your logout logic here, e.g., call your API to log out
      this.$store.dispatch('logout'); // Example with Vuex
      this.$router.push({ name: 'login' }); // Redirect to login after logout
    },
  },
};
</script>

<style scoped>
/* Add any additional custom styles here */

@import './public/asset1/css/bootstrap.min.css';
@import './public/asset1/css/font-awesome.min.css';
@import './public/asset1/css/select2.min.css';
@import './public/asset1/css/style.css';
@import './public/asset1/fonts/css/font-awesome.css';
@import './public/select2/select2-bootstrap.css';
@import './public/select2/select2-bootstrap.min.css';
@import './public/assets/plugins/toggle-sidebar/sidemenu.css';
</style>


