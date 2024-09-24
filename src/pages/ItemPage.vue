<script setup>
import { useRouter, useRoute } from "vue-router";
import AppLayout from "../layouts/AppLayout.vue";
import ImageComp from "../components/ImageComp.vue";
import { computed } from "vue";
import { useItemStore } from "../store";

const itemStore = useItemStore();
const router = useRouter();
const route = useRoute();
itemStore.getItem(route.params.id);

const form = computed(() => {
  return itemStore.item?.data || {};
});

const onBack = () => router.push("/");
</script>

<template>
  <AppLayout>
    <div class="flex flex-col gap-8 p-8">
      <h1 class="text-4xl font-bold">View Cloth Item</h1>
      <form class="text-lg flex gap-6">
        <div class="flex-grow">
          <label class="flex flex-col gap-1">
            Name
            <input
              class="border px-4 py-2"
              name="name"
              type="name"
              :value="form.name"
            />
          </label>
          <label class="flex flex-col gap-1">
            Category
            <input
              class="border px-4 py-2"
              name="category"
              type="text"
              :value="form.category"
            />
          </label>
          <label class="flex flex-col gap-1">
            Size
            <input
              class="border px-4 py-2"
              name="size"
              type="text"
              :value="form.size"
            />
          </label>
          <label class="flex flex-col gap-1">
            Color
            <input
              class="border px-4 py-2"
              name="color"
              type="color"
              :value="form.color"
            />
          </label>
        </div>
        <div class="flex-grow">
          <ImageComp :image="form.image" />
        </div>
      </form>
      <div>
        <button
          class="bg-blue-500 px-4 py-2 rounded text-white"
          @click="onBack"
        >
          Back
        </button>
      </div>
    </div>
  </AppLayout>
</template>
