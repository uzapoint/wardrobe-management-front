<template>
  <div class="container">
    <h1 class="text-center mb-4">{{ isEdit ? 'Edit Clothing Item' : 'Add New Clothing Item' }}</h1>
    <form @submit.prevent="submitForm" class="form-card">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="cloth.name" type="text" class="form-control" required placeholder="Enter clothing name" />
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <input v-model="cloth.category" type="text" class="form-control" required placeholder="Enter clothing category" />
      </div>
      <div class="form-group">
        <label for="size">Size</label>
        <input v-model="cloth.size" type="text" class="form-control" required placeholder="Enter clothing size" />
      </div>
      <div class="form-group">
        <label for="color">Color</label>
        <input v-model="cloth.color" type="text" class="form-control" required placeholder="Enter clothing color" />
      </div>
      <button type="submit" class="btn btn-primary w-100">{{ isEdit ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cloth: {
        name: '',
        category: '',
        size: '',
        color: ''
      },
      isEdit: false
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.isEdit = true;
      this.getCloth(this.$route.params.id);
    }
  },
  methods: {
    getCloth(id) {
      axios.get(`/api/clothes/${id}`)
        .then(response => {
          this.cloth = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    async submitForm() {
      try {
        if (this.isEdit) {
          await axios.put(`http://wardrobe-management-system.test:8000/api/clothes/${this.$route.params.id}`, this.cloth);
        } else {
          await axios.post('http://wardrobe-management-system.test:8000/api/clothes', this.cloth, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`, 
              'Content-Type': 'application/json'
            }
          });
        }
        this.$router.push('/');
      } catch (error) {
        console.error('Error:', error.response?.data || error.message);
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  color: #333;
}

.form-card {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input.form-control {
  border: 1px solid #ced4da;
  border-radius: 5px;
  padding: 0.5rem;
  width: 100%;
}

input.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  border-radius: 5px;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.w-100 {
  width: 100%;
}
</style>
