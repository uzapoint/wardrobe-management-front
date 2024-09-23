<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <h2>Edit Clothing Item</h2>
            </div>
            <div class="card-body">
              <form @submit.prevent="updateClothing">
                <div class="mb-3">
                  <label for="name" class="form-label">Name</label>
                  <input type="text" v-model="clothing.name" id="name" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="category" class="form-label">Category</label>
                  <input type="text" v-model="clothing.category" id="category" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="size" class="form-label">Size</label>
                  <input type="text" v-model="clothing.size" id="size" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="image" class="form-label">Image</label>
                  <input type="file" @change="onFileChange" id="image" class="form-control" />
                </div>
                <button type="submit" class="btn btn-primary">Update Clothing</button>
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
        clothing: {
          name: '',
          category: '',
          size: '',
          image: ''
        },
        error: ''
      };
    },
    mounted() {
      this.fetchClothing();
    },
    methods: {
      fetchClothing() {
        const id = this.$route.params.id; // Get the clothing ID from route params
        axios.get(`/api/clothes/${id}`)
          .then(response => {
            this.clothing = response.data;
          })
          .catch(error => {
            console.error('Error fetching clothing:', error);
            this.error = 'Failed to fetch clothing item.';
          });
      },
      onFileChange(event) {
        this.clothing.image = event.target.files[0];
      },
      async updateClothing() {
  const formData = new FormData();
  formData.append('name', this.name);
  formData.append('category', this.category);
  formData.append('size', this.size);
  if (this.image) {
    formData.append('image', this.image);
  }

  try {
    const response = await axios.post(`/api/clothes/update/${this.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    // Handle the response
    if (response.status === 200) {
      // Optionally show a success message
      this.$toast.success('Clothing item updated successfully!');
      this.$router.push('/dashboard'); // Redirect after successful update
    }
  } catch (error) {
    console.error('Error updating clothing:', error);
    // Handle error response
    if (error.response && error.response.data) {
      this.$toast.error(error.response.data.message || 'An error occurred while updating clothing.');
    } else {
      this.$toast.error('An unexpected error occurred.');
    }
  }
}

    }
  };
  </script>
  