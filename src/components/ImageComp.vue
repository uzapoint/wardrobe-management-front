<script setup>
import { defineProps } from "vue";
const props = defineProps(["image"]);
</script>
<template>
  <div v-if="props.image"><img :src="props.image.url" alt="" /></div>
  <div v-else class="bg-gray-300 flex justify-center items-center flex-grow">
    No Image
  </div>
</template>
