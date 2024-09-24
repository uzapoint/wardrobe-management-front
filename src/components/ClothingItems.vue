<template>
    <div class="container">
      <!-- Navigation Bar -->
      <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Clothing App</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
            </ul>
            <button class="btn btn-primary my-3" @click="navigateToForgotPass">Reset Password</button>
            <button class="btn btn-danger" @click="logout">Logout</button>
          </div>
        </div>
      </nav>
  
      <h2 class="mt-4">Clothing Items</h2>
  
      <!-- Button to trigger modal -->
      <button type="button" class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#addItemModal">
        Add Clothing Item
      </button>
  
      <!-- Table View -->
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Color</th>
            <th>Material</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in clothingItems" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.size }}</td>
            <td>{{ item.color }}</td>
            <td>{{ item.material }}</td>
            <td>{{ item.category ? item.category.name : 'N/A' }}</td>
            <td>
              <button class="btn btn-warning btn-sm" @click="navigateToEditItem(item.id)">Edit</button>
              <button class="btn btn-danger btn-sm" @click="deleteItem(item.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Add Item Modal -->
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
                <!-- Category Select Input -->
                <div class="mb-3">
                  <label for="itemCategory" class="form-label">Category</label>
                  <select id="itemCategory" v-model="newItem.category_id" class="form-control" required>
                    <option value="" disabled>Select a category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
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
  import axios from '../axios';
  
  export default {
    data() {
      return {
        clothingItems: [],
        categories: [], // Store fetched categories here
        newItem: {
          name: '',
          size: '',
          color: '',
          material: '',
          image: null,
          category_id: '', // Add category_id field for selection
        },
      };
    },
    methods: {
      async fetchClothingItems() {
        try {
          const response = await axios.get('/clothing-items');
          this.clothingItems = response.data;
        } catch (error) {
          console.error('Error fetching clothing items:', error);
        }
      },
      async fetchCategories() {
        try {
          const response = await axios.get('/categories');
          this.categories = response.data;
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      },
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
        formData.append('category_id', this.newItem.category_id); // Add category_id to form data

        try {
            await axios.post('/clothing-items', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            this.fetchClothingItems(); // Refresh the items list
            this.newItem = {}; // Reset form fields

            // Close the modal
            const modalElement = document.getElementById('addItemModal');
            // eslint-disable-next-line no-undef
            const modal = bootstrap.Modal.getInstance(modalElement); // Get the modal instance
            modal.hide(); // Hide the modal after successful submission

        } catch (error) {
            console.error('Error adding clothing item:', error);
        }
    },
      navigateToEditItem(id) {
        this.$router.push({ name: 'edit-clothing-item', params: { id } });
      },
      async deleteItem(id) {
        try {
          await axios.delete(`/clothing-items/${id}`);
          this.fetchClothingItems(); // Refresh the item list
        } catch (error) {
          console.error('Error deleting clothing item:', error);
        }
      },
      async logout() {
        try {
          await axios.post('/logout');
          window.location.href = '/login'; // Redirect to login page
        } catch (error) {
          console.error('Error logging out:', error);
        }
      },
    },
    mounted() {
      this.fetchClothingItems();
      this.fetchCategories(); // Fetch categories on mount
    },
  };
  </script>
  
  <style scoped>
  .navbar {
    margin-bottom: 20px;
  }
  </style>
  