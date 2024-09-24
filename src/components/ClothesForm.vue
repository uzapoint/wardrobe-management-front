<template>
    <div>
      <h1>Add Clothing Item</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="name">Name</label>
          <input type="text" id="name" v-model="formData.name" required />
        </div>
        <div>
          <label for="category">Category</label>
          <input type="text" id="category" v-model="formData.category" required />
        </div>
        <div>
          <label for="size">Size</label>
          <input type="text" id="size" v-model="formData.size" required />
        </div>
        <div>
          <label for="color">Color</label>
          <input type="text" id="color" v-model="formData.color" required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          name: '',
          category: '',
          size: '',
          color: ''
        }
      };
    },
    methods: {
      async submitForm() {
        try {
          const response = await this.$axios.post('/clothes', this.formData);
          console.log('Clothing item added:', response.data);
          // You can redirect or reset the form here if needed
        } catch (error) {
          console.error('Error adding clothing item:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>
  