<template>
    <div class="clothes-list">
      <h1>Clothing Items</h1>
      <ul>
        <li v-for="cloth in clothes" :key="cloth.id">
          {{ cloth.name }} - {{ cloth.category }} - {{ cloth.size }} - {{ cloth.color }}
          <button @click="editCloth(cloth.id)">Edit</button>
          <button @click="deleteCloth(cloth.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import apiClient from '@/api/apiClient'; // Adjust the path if necessary
  
  export default {
    data() {
      return {
        clothes: []
      };
    },
    created() {
      this.fetchClothes();
    },
    methods: {
      fetchClothes() {
        apiClient.get('/clothes')
          .then(response => {
            this.clothes = response.data;
          })
          .catch(error => {
            console.error('Error fetching clothes:', error);
          });
      },
      deleteCloth(id) {
        if (confirm('Are you sure you want to delete this item?')) {
          apiClient.delete(`/clothes/${id}`)
            .then(() => {
              this.fetchClothes();  // Refresh the list after deletion
            })
            .catch(error => {
              console.error('Error deleting cloth:', error);
            });
        }
      },
      editCloth(id) {
        this.$router.push({ name: 'EditCloth', params: { id } });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  .clothes-list {
    padding: 20px;
  }
  .clothes-list ul {
    list-style-type: none;
    padding: 0;
  }
  .clothes-list li {
    margin-bottom: 10px;
  }
  .clothes-list button {
    margin-left: 10px;
  }
  </style>
  