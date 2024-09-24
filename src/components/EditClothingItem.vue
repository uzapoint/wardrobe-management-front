<template>
    <div class="container">
      <h2>Edit Clothing Item</h2>
      <form @submit.prevent="updateItem">
        <div class="mb-3">
          <label for="itemName" class="form-label">Item Name</label>
          <input type="text" class="form-control" v-model="item.name" required />
        </div>
        <div class="mb-3">
          <label for="itemSize" class="form-label">Size</label>
          <input type="text" class="form-control" v-model="item.size" required />
        </div>
        <div class="mb-3">
          <label for="itemColor" class="form-label">Color</label>
          <input type="text" class="form-control" v-model="item.color" required />
        </div>
        <div class="mb-3">
          <label for="itemMaterial" class="form-label">Material</label>
          <input type="text" class="form-control" v-model="item.material" required />
        </div>
        <button type="submit" class="btn btn-primary">Update Item</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from '../axios';
  
  export default {
    data() {
      return {
        item: {
          id: null,
          name: '',
          size: '',
          color: '',
          material: '',
        },
      };
    },
    async mounted() {
    const itemId = this.$route.params.id;
    try {
        const response = await axios.get(`/clothing-items/${itemId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        this.item = response.data;
    } catch (error) {
        console.error('Error fetching clothing item:', error.response ? error.response.data : error);
    }
},
    methods: {
      async updateItem() {
        try {
          await axios.put(`/clothing-items/${this.item.id}`, this.item, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          this.$router.push('/clothing-items');
        } catch (error) {
          console.error('Error updating clothing item:', error);
        }
      },
    },
  };
  </script>
  