<script setup>
import { defineProps } from "vue";
import ImageComp from "./ImageComp.vue";
const props = defineProps(["item"]);
</script>

<template>
  <div class="flex shadow-md rounded-lg overflow-hidden border border-gray-200">
    <div class="w-1/2 flex">
      <ImageComp :image="props.item.image" />
    </div>
    <div class="p-4 w-1/2">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-4">
          <div class="flex justify-between">
            <div class="w-1/2 font-bold">Name</div>
            <div class="w-1/2">{{ props.item.name }}</div>
          </div>
          <div class="flex justify-between">
            <div class="w-1/2 font-bold">Category</div>
            <div class="w-1/2">{{ props.item.category }}</div>
          </div>
          <div class="flex justify-between">
            <div class="w-1/2 font-bold">Color</div>
            <div class="w-1/2">{{ props.item.color }}</div>
          </div>
          <div class="flex justify-between">
            <div class="w-1/2 font-bold">Size</div>
            <div class="w-1/2">{{ props.item.size }}</div>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <button
            class="bg-gray-500 px-4 py-2 rounded text-white hover:bg-gray-600"
          >
            View
          </button>
          <button
            class="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            class="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
