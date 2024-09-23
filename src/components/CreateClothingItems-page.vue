<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <h2>Add New Clothing Item</h2>
            </div>
            <div class="card-body">
              <form @submit.prevent="addClothing">
                <div class="mb-3">
                  <label for="name" class="form-label">Name</label>
                  <input type="text" v-model="name" id="name" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="category" class="form-label">Category</label>
                  <input type="text" v-model="category" id="category" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="size" class="form-label">Size</label>
                  <input type="text" v-model="size" id="size" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="image" class="form-label">Image</label>
                  <input type="file" @change="onFileChange" id="image" class="form-control" />
                </div>
                <button type="submit" class="btn btn-primary">Add Clothing</button>
              </form>
              <p v-if="error" class="text-danger mt-3">{{ error }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        name: '',
        category: '',
        size: '',
        image: null,
        error: ''
      };
    },
    methods: {
      onFileChange(event) {
        this.image = event.target.files[0];
      },
      async addClothing() {
  const formData = new FormData();
  formData.append('name', this.name);
  formData.append('category', this.category);
  formData.append('size', this.size);
  if (this.image) {
    formData.append('image', this.image);
  }

  try {
    const response = await axios.post('/api/clothes/store', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    // Handle the response
    if (response.status === 200) {
      // Optionally show a success message
      this.$toast.success('Clothing item added successfully!');
      this.$router.push('/dashboard'); // Redirect after successful addition
    }
  } catch (error) {
    console.error('Error adding clothing:', error);
    // Handle error response
    if (error.response && error.response.data) {
      this.$toast.error(error.response.data.message || 'An error occurred while adding clothing.');
    } else {
      this.$toast.error('An unexpected error occurred.');
    }
  }
}

    }
  };
  </script>
  