<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-links">
        <router-link to="/clothes" class="nav-link">Clothes</router-link>
        <router-link to="/" class="nav-link">Login</router-link>
        <router-link to="/signup" class="nav-link">Register</router-link>
      </div>
    </nav>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: #007bff;
  padding: 1rem;
}

.navbar-links {
  display: flex;
  justify-content: center;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover {
  background-color: #0056b3;
  color: #ffffff;
}

.content {
  flex: 1;
  padding: 2rem;
}
</style>
