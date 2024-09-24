<template>
  <v-dialog max-width="650px">
    <v-card>
      <v-card-title class="text-center">
        <span class="headline">Add Clothing Item</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="newClothingItem.name"
            :rules="[rules.required]"
            label="Name"
            required
          />
          <v-text-field
            v-model="newClothingItem.category"
            :rules="[rules.required]"
            label="Category"
            required
          />
          <v-text-field
            v-model="newClothingItem.color"
            :rules="[rules.required]"
            label="Color"
            required
          />
          <v-text-field
            v-model="newClothingItem.size"
            :rules="[rules.required]"
            label="Size"
            required
          />
          <v-select
            v-model="newClothingItem.brand"
            :items="brands"
            :rules="[rules.required]"
            label="Brand"
            required
            return-object
          />
          <v-text-field
            v-model="newClothingItem.material"
            :rules="[rules.required]"
            label="Material"
            required
          />
          <!-- <v-text-field
            v-model="newClothingItem.purchase_date"
            :rules="[rules.required]"
            label="Purchase Date"
            required
            type="date"
          /> -->
          <v-text-field
            v-model="newClothingItem.price"
            :rules="[rules.required, rules.number]"
            label="Price"
            required
            type="number"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="green darken-1" text @click="addClothingItem()"
          >Add Clothes</v-btn
        >
        <v-btn color="grey" text @click="$emit('update:dialog', false)"
          >Cancel</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref } from "vue";
import { ClothesStore } from "../../src/stores/wordRobe";

export default {
  name: "AddClothingItemDialog",
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const valid = ref(false);
    const newClothingItem = ref({
      name: "",
      category: "",
      color: "",
      size: "",
      brand: null,
      material: "",
      price: "",
    });
    const brands = ["nike", "adidas", "puma", "levis", "zara"];

    const rules = {
      required: (v) => !!v || "This field is required",
      number: (v) => !isNaN(v) || "Must be a number",
    };

    // Use the store
    const clothesStore = ClothesStore();

    const addClothingItem = async () => {
      if (valid.value && (await validateForm())) {
        clothesStore.ClothesToAdd(newClothingItem.value);
        // await clothesStore.getAllClothes();
        resetForm();
        emit("update:dialog", false);
      }
    };

    const validateForm = () => {
      return new Promise((resolve) => {
        resolve(valid.value);
      });
    };

    const resetForm = () => {
      newClothingItem.value = {
        name: "",
        category: "",
        color: "",
        size: "",
        brand: null,
        material: "",
        purchase_date: "",
        price: "",
      };
    };

    return {
      valid,
      newClothingItem,
      brands,
      rules,
      addClothingItem,
      resetForm,
    };
  },
};
</script>
