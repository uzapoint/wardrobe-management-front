<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  <LoginComponent />
  <RegisterComponent />
  <ClothList />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import ClothList from './components/ClothList.vue'
import LoginComponent from './components/LoginComponent.vue';
import RegisterComponent from './components/RegisterComponent.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    LoginComponent,
    RegisterComponent,
    ClothList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
