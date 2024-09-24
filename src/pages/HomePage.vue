<script setup>
import { useRouter } from "vue-router";
import AppLayout from "../layouts/AppLayout.vue";
import ItemCard from "../components/ItemCard.vue";
import { useItemStore } from "../store";

const itemStore = useItemStore();
const router = useRouter();
itemStore.getItems();

const onNew = () => {
  router.push("/item/new");
};

const onPrev = () => {
  itemStore.getItems({ page: itemStore.items.current_page - 1 });
};

const onNext = () => {
  itemStore.getItems({ page: itemStore.items.current_page + 1 });
};
</script>

<template>
  <AppLayout>
    <div class="p-4 flex flex-col gap-6">
      <div class="flex justify-end">
        <button class="bg-blue-500 px-4 py-2 rounded text-white" @click="onNew">
          New
        </button>
      </div>
      <div class="grid grid-cols-2 gap-6">
        <ItemCard
          v-for="item in itemStore.items.data"
          :key="item.id"
          :item="item"
        />
      </div>
      <div class="flex justify-between items-center gap-4">
        <button
          class="bg-blue-500 px-4 py-2 rounded text-white"
          :disabled="itemStore.items.prev_page_url === null"
          @click="onPrev"
        >
          Prev
        </button>
        <span
          >{{ itemStore.items.current_page }}/{{
            itemStore.items.last_page
          }}</span
        >
        <button
          class="bg-blue-500 px-4 py-2 rounded text-white"
          :disabled="itemStore.items.next_page_url === null"
          @click="onNext"
        >
          Next
        </button>
      </div>
    </div>
  </AppLayout>
</template>
