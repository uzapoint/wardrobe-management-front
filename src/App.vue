<template>
  <v-app>
    <v-app-bar app color="primary" dark height="100">
      <v-toolbar-title></v-toolbar-title>
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
  },
};
</script>

<style scoped></style>
