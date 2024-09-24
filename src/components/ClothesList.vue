<template>
  <div class="clothes-list-container">
    <h1 class="text-center">Clothes List</h1>
    <router-link to="/add" class="btn btn-primary mb-3">Add New Clothing</router-link>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Size</th>
            <th>Color</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cloth in clothes" :key="cloth.id">
            <td>{{ cloth.name }}</td>
            <td>{{ cloth.category }}</td>
            <td>{{ cloth.size }}</td>
            <td>{{ cloth.color }}</td>
            <td>
              <router-link :to="`/edit/${cloth.id}`" class="btn btn-info btn-sm">Edit</router-link>
              <button @click="deleteCloth(cloth.id)" class="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      clothes: []
    };
  },
  mounted() {
    this.getClothes();
  },
  methods: {
    getClothes() {
      axios.get('http://wardrobe-management-system.test:8000/api/clothes')
        .then(response => {
          this.clothes = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteCloth(id) {
      if (confirm('Are you sure you want to delete this item?')) {
        axios.delete(`http://wardrobe-management-system.test:8000/api/clothes/${id}`)
          .then(() => {
            this.getClothes();
          });
      }
    }
  }
};
</script>

<style scoped>
.clothes-list-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.table-responsive {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f2f2f2;
}

th {
  background-color: #007bff;
  color: white;
  padding: 0.75rem;
}

td {
  padding: 0.75rem;
}

button, .btn {
  margin-left: 5px;
}

.mb-3 {
  margin-bottom: 1rem;
}
</style>
