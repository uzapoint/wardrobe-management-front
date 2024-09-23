<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h2>Dashboard</h2>
          </div>
          <div class="card-body">
            <p>Welcome, {{ user.name }}!</p>
            <button class="btn btn-danger" @click="logout">Logout</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-md-12">
        <table id="clothesTable" class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Size</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="clothing in clothes" :key="clothing.id">
              <td>{{ clothing.name }}</td>
              <td>{{ clothing.category }}</td>
              <td>{{ clothing.size }}</td>
              <td><img :src="clothing.image" alt="Clothing Image" class="img-thumbnail" width="100"/></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import 'datatables.net-bs5'; // DataTables with Bootstrap 5 integration
import $ from 'jquery'; // Import jQuery
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';

export default {
  data() {
    return {
      user: {},
      clothes: []
    };
  },
  mounted() {
  // Check if the token is in localStorage and set it in Axios headers
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // If no token, redirect to login
    this.$router.push('/login');
  }

  // Fetch the authenticated user's data
  axios.get('/api/user')
    .then(response => {
      this.user = response.data;
    })
    .catch(error => {
      console.error('Failed to fetch user', error);
      // Redirect to login if token is invalid
      this.$router.push('/login');
    });

  // Fetch the user's clothes data
  this.fetchClothes();
},

methods: {
  fetchClothes() {
    axios.get('/api/all-clothes')
      .then(response => {
        this.clothes = response.data;
        this.$nextTick(() => {
          $('#clothesTable').DataTable(); // Initialize DataTables after DOM update
        });
      })
      .catch(error => {
        console.error('Error fetching clothes:', error);
      });
  },
  logout() {
    axios.post('/logout')
      .then(() => {
        // Remove token from localStorage
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];

        // Redirect to login
        this.$router.push('/login');
      })
      .catch(error => {
        console.error('Logout failed', error);
      });
  }
}

};
</script>

<style scoped>
/* Optional additional styles */
.img-thumbnail {
  object-fit: cover;
  height: 100px;
}
</style>
