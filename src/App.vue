<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" class="navbar-brand">Wardrobe Management System</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" /> Home
          </router-link>
        </li>
        <li  class="nav-item">
          <router-link to="/categories" class="nav-link">Categories</router-link>
        </li>
        <li  class="nav-item">
          <router-link to="/sizes" class="nav-link">Sizes</router-link>
        </li>
        <li  class="nav-item">
          <router-link to="/colors" class="nav-link">Colors</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/clothes" class="nav-link">Clothes List</router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Vuex from "vuex";

export default  new Vuex.Store({
  state: {
    auth: {
      user: null, // Initialize as null or an empty object
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.auth.user = user;
    },
    LOGOUT(state) {
      state.auth.user = null; // Reset on logout
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
});
</script>
