<script setup>
import { defineProps } from "vue";
import ImageComp from "./ImageComp.vue";
import { useRouter } from "vue-router";
import { useItemStore } from "../store";

const itemStore = useItemStore();
const props = defineProps(["item"]);
const router = useRouter();

const onView = () => router.push(`/item/${props.item.id}`);
const onEdit = () => router.push(`/item/${props.item.id}/edit`);
const onDelete = () => {
  itemStore.deleteItem(props.item.id);
};
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
            @click="onView"
          >
            View
          </button>
          <button
            @click="onEdit"
            class="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            @click="onDelete"
            class="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
