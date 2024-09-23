<template>
  <router-view :key="route.fullPath" />
</template>

<script setup>
import { useRoute } from 'vue-router'; // Import useRoute from vue-router

const route = useRoute(); // Get the current route object
</script>

<style lang="css">
/* Add your styles here if needed */
</style>
