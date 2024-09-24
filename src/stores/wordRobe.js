import { defineStore } from "pinia";

import {
  GetAllClothes,
  DeleteClotheById,
  AddClotheProduct,
} from "../../api/mainAxios";

export const ClothesStore = defineStore("clothes", {
  // State: your reactive data
  state: () => ({
    Allclothes: [],
    clothingItem: {},
  }),

  // Actions: functions to modify state
  actions: {
    async getAllClothes() {
      try {
        const response = await GetAllClothes();
        this.Allclothes = response.data;
      } catch (error) {
        console.error("Failed to fetch clothes:", error);
      }
    },

    async deleteClothes(id) {
      try {
        const response = await DeleteClotheById(id); // Call your delete API method
        if (response.status === 200) {
          console.log(`Deleted clothing item with ID: ${id}`);
          // Fetch the updated list of clothes after deletion
          await this.getAllClothes();
        } else {
          console.error("Failed to delete clothes:", response);
        }
      } catch (error) {
        console.error("Failed to delete clothes:", error);
      }
    },

    async ClothesToAdd(clothingItem) {
      try {
        const newItem = await AddClotheProduct(clothingItem);
        this.allClothes.push(newItem); // Add the new item to the store's state
        console.log("Added clothing item:", newItem);
      } catch (error) {
        console.error("Failed to add clothing item:", error);
      }
    },
  },
});
