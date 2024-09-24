<script setup>
import { useRouter, useRoute } from "vue-router";
import AppLayout from "../layouts/AppLayout.vue";
import ImageComp from "../components/ImageComp.vue";
import { reactive } from "vue";
import { useItemStore } from "../store";

const itemStore = useItemStore();
const router = useRouter();
const route = useRoute();
itemStore.getItem(route.params.id);

const form = reactive({
  name: "",
  category: "",
  size: "",
  color: "",
});

itemStore.$subscribe((_, state) => {
  if (state.item?.data) {
    form.name = state.item?.data?.name;
    form.category = state.item?.data?.category;
    form.size = state.item?.data?.size;
    form.color = state.item?.data?.color;
  }
});

const onCancel = () => router.push("/");
const onSave = async () => {
  await itemStore.updateItem(itemStore.item.data.id, form);
};
</script>

<template>
  <AppLayout>
    <div class="flex flex-col gap-8 p-8">
      <h1 class="text-4xl font-bold">Edit Cloth Item</h1>
      <form class="text-lg flex gap-6">
        <div class="flex-grow">
          <label class="flex flex-col gap-1">
            Name
            <input
              class="border px-4 py-2"
              name="name"
              type="name"
              v-model="form.name"
            />
          </label>
          <label class="flex flex-col gap-1">
            Category
            <select
              class="border px-4 py-2"
              name="category"
              v-model="form.category"
            >
              <option value="">Select Category</option>
              <option value="shirt">Shirt</option>
              <option value="shoes">Shoes</option>
              <option value="trouser">Trouser</option>
              <option value="jacket">Jacket</option>
            </select>
          </label>
          <label class="flex flex-col gap-1">
            Size
            <select class="border px-4 py-2" name="size" v-model="form.size">
              <option value="">Select Size</option>
              <option value="xs">XS</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
            </select>
          </label>
          <label class="flex flex-col gap-1">
            Color
            <select class="border px-4 py-2" name="color" v-model="form.color">
              <option value="">Select Color</option>
              <option value="white">White</option>
              <option value="black">Black</option>
              <option value="blue">Blue</option>
            </select>
          </label>
        </div>
        <div class="flex-grow">
          <ImageComp v-if="form.image" :image="form.image" />
          <!-- <input v-else @change="form.image = $event" type="file" /> -->
        </div>
      </form>
      <div class="flex gap-6">
        <button
          class="bg-blue-500 px-4 py-2 rounded text-white"
          @click="onSave"
        >
          Edit
        </button>
        <button
          class="bg-red-500 px-4 py-2 rounded text-white"
          @click="onCancel"
        >
          Cancel
        </button>
      </div>
    </div>
  </AppLayout>
</template>
