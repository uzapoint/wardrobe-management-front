<template>
    <div>
      <!-- Button to trigger the modal -->
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addItemModal">
        Add Clothing Item
      </button>
  
      <!-- Add Item Modal Structure -->
      <div class="modal fade" id="addItemModal" tabindex="-1" aria-labelledby="addItemModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addItemModalLabel">Add Clothing Item</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="addItem">
                <div class="mb-3">
                  <label for="itemName" class="form-label">Item Name</label>
                  <input type="text" id="itemName" v-model="newItem.name" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="itemImage" class="form-label">Image</label>
                  <input type="file" @change="onFileChange" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="itemSize" class="form-label">Size</label>
                  <input type="text" id="itemSize" v-model="newItem.size" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="itemColor" class="form-label">Color</label>
                  <input type="text" id="itemColor" v-model="newItem.color" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="itemMaterial" class="form-label">Material</label>
                  <input type="text" id="itemMaterial" v-model="newItem.material" class="form-control" required />
                </div>
                <button type="submit" class="btn btn-primary">Add Item</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'; // Adjust the path if necessary
  
  export default {
    data() {
      return {
        newItem: {
          name: '',
          size: '',
          color: '',
          material: '',
          image: null,
        },
      };
    },
    methods: {
      onFileChange(event) {
        this.newItem.image = event.target.files[0];
      },
      async addItem() {
        const formData = new FormData();
        formData.append('name', this.newItem.name);
        formData.append('size', this.newItem.size);
        formData.append('color', this.newItem.color);
        formData.append('material', this.newItem.material);
        formData.append('image', this.newItem.image);
  
        try {
          await axios.post('/api/clothing-items', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          this.$emit('refresh'); // Refresh the item list
          this.newItem = {}; // Reset form
          // Close the modal manually
          const modalElement = document.getElementById('addItemModal');
          // eslint-disable-next-line no-undef
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal.hide();
        } catch (error) {
          console.error('Error adding clothing item:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styles for the AddClothingItem component */
  </style>
  