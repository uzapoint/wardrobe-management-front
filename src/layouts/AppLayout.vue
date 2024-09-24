<script setup>
import { computed } from "vue";
import { useAuthStore } from "../store";

const auth = useAuthStore();

const name = computed(() => {
  return auth.user?.name;
});

const onLogout = () => {
  auth.logout();
};
</script>

<template>
  <div class="min-h-screen w-full bg-gray-100 flex justify-center">
    <div class="w-full p-2 md:w-3/4 flex flex-col gap-4">
      <nav class="bg-white shadow p-4 w-full">
        <div class="w-full flex justify-between items-center">
          <div class="text-xl font-bold">My Wardrobe</div>
          <div class="flex flex-col items-end gap-4">
            <span class="text-sm italic">{{ name }}</span>
            <button
              @click="onLogout"
              class="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div class="bg-white">
        <slot />
      </div>
    </div>
  </div>
</template>
