<template>
  <v-container>
    <h2 class="text-center mb-4">Clothes List</h2>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="search"
          label="Search by Name, Brand, or Material"
          append-icon="mdi-magnify"
          clearable
          variant="outlined"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="clothes in filteredClothes"
        :key="clothes.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="mb-4" outlined>
          <v-card-title>
            <v-row align="center">
              <v-col>
                <v-icon class="mr-2">{{ getIcon(clothes.name) }}</v-icon>
                <h3 class="headline">{{ clothes.name }}</h3>
              </v-col>
              <v-col class="text-right">
                <!-- <v-btn color="primary" @click="addToCart(clothes)">Add to Cart</v-btn> -->
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-subtitle>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <strong>Category:</strong>
                    <v-chip class="ml-2" color="blue" text-color="white">{{
                      clothes.category
                    }}</v-chip>
                  </v-list-item-title>
                  <v-list-item-title>
                    <strong>Color:</strong>
                    <v-chip class="ml-2" color="green" text-color="white">{{
                      clothes.color
                    }}</v-chip>
                  </v-list-item-title>
                  <v-list-item-title>
                    <strong>Size:</strong>
                    <v-chip class="ml-2" color="purple" text-color="white">{{
                      clothes.size
                    }}</v-chip>
                  </v-list-item-title>
                  <v-list-item-title>
                    <strong>Brand:</strong>
                    <v-chip class="ml-2" color="orange" text-color="white">{{
                      clothes.brand
                    }}</v-chip>
                  </v-list-item-title>
                  <v-list-item-title>
                    <strong>Material:</strong>
                    <v-chip class="ml-2" color="cyan" text-color="white">{{
                      clothes.material
                    }}</v-chip>
                  </v-list-item-title>
                  <!-- <v-list-item-title>
                    <strong>Purchase Date:</strong> {{ clothes.purchase_date }}
                  </v-list-item-title> -->
                  <v-list-item-title>
                    <strong>Price:</strong> ${{ clothes.price }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-subtitle>
          <v-card-actions>
            <v-btn text color="red" @click="removeClothes(clothes.id)"
              >Delete</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn text color="primary">Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="650px">
      <v-card>
        <v-card-title class="text-center">
          <span class="headline">Update Clothing Item</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="clothingItem.name"
              :rules="[rules.required, rules.maxLength(255)]"
              label="Name"
              required
            />
            <v-text-field
              v-model="clothingItem.category"
              :rules="[rules.required, rules.maxLength(255)]"
              label="Category"
              required
            />
            <v-text-field
              v-model="clothingItem.size"
              :rules="[rules.required, rules.maxLength(10)]"
              label="Size"
              required
            />
            <v-text-field
              v-model="clothingItem.color"
              :rules="[rules.required, rules.maxLength(50)]"
              label="Color"
              required
            />
            <v-text-field
              v-model="clothingItem.brand"
              :rules="[rules.required, rules.maxLength(50)]"
              label="Brand"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="updateClothingItem"
            >Update Item</v-btn
          >
          <v-btn color="grey" text @click="closeDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ClothesStore } from "../stores/wordRobe";
import { defineProps, ref, computed } from "vue";

const props = defineProps({
  clothesList: {
    type: Array,
    required: true,
  },
});

const search = ref("");
const currentPage = ref(1);
const itemsPerPage = 6;

const clothesStore = ClothesStore();

const filteredClothes = computed(() => {
  return props.clothesList
    .filter((clothes) => {
      const lowerSearch = search.value.toLowerCase();
      return (
        clothes.name.toLowerCase().includes(lowerSearch) ||
        clothes.brand.toLowerCase().includes(lowerSearch) ||
        clothes.material.toLowerCase().includes(lowerSearch)
      );
    })
    .slice(
      (currentPage.value - 1) * itemsPerPage,
      currentPage.value * itemsPerPage
    );
});

// Function to get the appropriate icon based on clothing name
const getIcon = (name) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("trouser")) return "mdi-pants";
  if (lowerName.includes("shirt")) return "mdi-shirt";
  if (lowerName.includes("t-shirt")) return "mdi-tshirt-crew";
  if (lowerName.includes("pullover")) return "mdi-sweater";
  return "mdi-clothing"; // Default icon
};

const removeClothes = async (id) => {
  await clothesStore.deleteClothes(id);
};
</script>

<style scoped>
/* Additional custom styles */
.v-card {
  transition: transform 0.2s;
}

.v-card:hover {
  transform: scale(1.02);
}

.v-chip {
  margin: 2px;
}
</style>
