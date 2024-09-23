<template>
    <div class="max-w-md mx-auto shadow-md p-6 rounded-lg text-left">
      <h1 class="text-xl font-bold mb-5">{{ isEdit ? 'Update' : 'Add' }} Cloth</h1>
      
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            v-model="cloth.name"
            class="mt-1 block w-full p-2 border rounded-lg"
            required
          />
        </div>
  
        <div class="mb-4">
          <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            id="category"
            v-model="cloth.category"
            class="mt-1 block w-full p-2 border rounded-lg"
            required
          />
        </div>
  
        <div class="mb-4">
          <label for="size" class="block text-sm font-medium text-gray-700">Size</label>
          <input
            type="text"
            id="size"
            v-model="cloth.size"
            class="mt-1 block w-full p-2 border rounded-lg"
            required
          />
        </div>
  
        <div class="mb-4">
          <label for="color" class="block text-sm font-medium text-gray-700">Color</label>
          <input
            type="text"
            id="color"
            v-model="cloth.color"
            class="mt-1 block w-full p-2 border rounded-lg"
            required
          />
        </div>
  
        <div class="mb-4">
          <label for="image" class="block text-sm font-medium text-gray-700">Image</label>
          <input type="file" @change="handleFileChange" class="mt-1 block w-full p-2 border rounded-lg" />
        </div>
  
        <div class="mb-4">
          <!-- Display image preview if there is one -->
          <img v-if="imagePreview" :src="imagePreview" class="w-32 h-32 object-cover rounded-lg" alt="Cloth Preview" />
        </div>
  
        <button
          type="submit"
          class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          {{ isEdit ? 'Update' : 'Add' }} Cloth
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from '../utils/axios.js';
  export default {
    data() {
      return {
        cloth: {
          name: '',
          category: '',
          size: '',
          color: '',
          image: null,
        },
        imagePreview: null,
        isEdit: false,
      };
    },
    created() {
      // Check if we are editing an existing cloth
      if (this.$route.params.id) {
        this.isEdit = true;
        this.fetchCloth(this.$route.params.id);
      }
    },
    methods: {
      async fetchCloth(id) {
        try {
          const response = await axios.get(`/clothes/${id}`);
          this.cloth = response.data;
          if (this.cloth.image) {
            this.imagePreview = `http://127.0.0.1:8000/storage/${this.cloth.image}`;
          }
        } catch (error) {
          console.error('Error fetching cloth:', error);
        }
      },
      handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.cloth.image = file;
          this.imagePreview = URL.createObjectURL(file);
        }
      },
      async submitForm() {
    try {
        const formData = new FormData();
        formData.append('name', this.cloth.name);
        formData.append('category', this.cloth.category);
        formData.append('size', this.cloth.size);
        formData.append('color', this.cloth.color);

        // Check if an image is selected for upload
        if (this.cloth.image) {
            formData.append('image', this.cloth.image);
        }

        if (this.isEdit) {
            // Update existing cloth
            const response = await axios.put(`/clothes/${this.$route.params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Cloth updated successfully!');
            console.log('Updated cloth data:', response.data);
        } else {
            // Add new cloth
            const response = await axios.post('/clothes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Cloth added successfully!');
            console.log('New cloth data:', response.data);
        }

        // Redirect to clothes list after successful submission
        this.$router.push('/clothes');
    } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error response for better user feedback
        if (error.response && error.response.data.errors) {
            const errors = error.response.data.errors;
            alert('Validation failed: ' + JSON.stringify(errors));
        } else {
            alert('Failed to submit the form. Please try again.');
        }
    }
}
    },
  };
  </script>
  
  <style scoped>

  </style>
  