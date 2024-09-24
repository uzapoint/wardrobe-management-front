<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>My Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="showCreateUserDialog" color="secondary" class="mr-2"
        >Create User</v-btn
      >
      <v-btn @click="showDialog" color="secondary">Add Clothes</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <add-clothes v-model="dialog" />
    <create-user v-model="createUserDialog" />
  </v-app>
</template>

<script>
import CreateUser from "./components/CreateUser.vue";
import addClothes from "./components/addClothes.vue";
export default {
  data() {
    return {
      dialog: false,
      createUserDialog: false,
    };
  },
  components: { addClothes, CreateUser },
  name: "App",
  methods: {
    showDialog() {
      this.dialog = true;
    },
    showCreateUserDialog() {
      this.createUserDialog = true;
    },
    addUser() {
      // Logic for adding a user
      console.log("Add User button clicked");
    },
    createUser() {
      // Logic for creating a user
      console.log("Create User button clicked");
    },
  },
};
</script>

<style scoped>
/* Custom styles can go here */
</style>
