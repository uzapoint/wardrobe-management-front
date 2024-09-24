<template>
  <div class="container-fluid">
    <!-- Header and Add Category Button -->
    <div class="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
      <div class="card-body px-4 py-3">
        <div class="row align-items-center">
          <div class="col-9">
            <h4 class="fw-semibold mb-8">Category List</h4>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page">Categories</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Categories List -->
    <div class="card shadow rounded">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h4 class="mb-0">Categories</h4>
        <RouterLink to="/dashboard/categories/create" class="btn btn-sm btn-dark">Add Category</RouterLink>
      </div>
      <div class="card-body p-3">
        <div class="table-responsive border rounded">
          <table class="table align-middle text-nowrap mb-0">
            <thead class="table-light">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Category Name</th>
                <th scope="col">Created At</th>
                <th scope="col">Updated At</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(category) in categories" :key="category.id" class="hover-effect">
                <td>{{ category.id }}</td>
                <td>{{ category.name }}</td>
                <td>{{ formatDate(category.created_at) }}</td>
                <td>{{ formatDate(category.updated_at) }}</td>
                <td>
                  <div class="btn-group" role="group" aria-label="Actions">
                    <button @click="selectCategory(category)" class="btn btn-sm btn-primary mx-2">
                      <i class="bi bi-eye"></i> View
                    </button>
                    <button @click="selectCategoryEdit(category)" class="btn btn-sm btn-secondary mx-2">
                      <i class="bi bi-pencil"></i> Edit
                    </button>
                    <button @click="deleteCategory(category.id)" class="btn btn-sm btn-danger mx-2">
                      <i class="bi bi-trash"></i> Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- View Category Modal -->
    <div v-if="selectedCategory" class="modal show d-block" tabindex="-1" role="dialog" style="display: block;">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Category Details</h5>
            <button type="button" class="btn-close" @click="selectedCategory = null"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <!-- Category Basic Details -->
              <div class="col-lg-12">
                <div class="card mb-3">
                  <div class="card-header">Basic Information</div>
                  <div class="card-body">
                    <p><strong>ID:</strong> {{ selectedCategory.id }}</p>
                    <p><strong>Category Name:</strong> {{ selectedCategory.name }}</p>
                    <p><strong>Created At:</strong> {{ formatDate(selectedCategory.created_at) }}</p>
                    <p><strong>Updated At:</strong> {{ formatDate(selectedCategory.updated_at) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Category Modal -->
    <div v-if="editCategory" class="modal show d-block" tabindex="-1" role="dialog" style="display: block;">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Category</h5>
            <button type="button" class="btn-close" @click="editCategory = null"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateCategory">
              <div class="mb-3">
                <label for="category_name" class="form-label">Category Name</label>
                <input type="text" id="category_name" v-model="editCategory.name" class="form-control" required />
                <div class="invalid-feedback" v-if="editCategory.name.length === 0">Please provide a category name.</div>
              </div>
              <button type="submit" class="btn btn-primary">Update Category</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '@/stores/userState';
import { useNotificationStore } from '@/stores/notificationStore';
import axios from 'axios';

const categories = ref([]);
const selectedCategory = ref(null);
const editCategory = ref(null);
const userStore = useUserStore();
const notificationStore = useNotificationStore();
const BASE_URL = 'http://127.0.0.1:8000';
const token = computed(() => userStore.getToken);

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/categories`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.value}`,
      },
    });
    categories.value = response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    notificationStore.showNotification('Error fetching categories. Please try again later.', 'error');
  }
};

const selectCategory = (category) => {
  selectedCategory.value = { ...category };
};

const selectCategoryEdit = (category) => {
  editCategory.value = { ...category };
};

const deleteCategory = async (categoryId) => {
  try {
    await axios.delete(`${BASE_URL}/api/categories/${categoryId}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.value}`,
      },
    });
    await fetchCategories();
    notificationStore.showNotification('Category deleted successfully.', 'success');
  } catch (error) {
    console.error('Error deleting category:', error);
    notificationStore.showNotification('Error deleting category. Please try again later.', 'error');
  }
};

const updateCategory = async () => {
  try {
    await axios.put(`${BASE_URL}/api/categories/${editCategory.value.id}`, editCategory.value, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    });
    await fetchCategories();
    editCategory.value = null;
    notificationStore.showNotification('Category updated successfully.', 'success');
  } catch (error) {
    console.error('Error updating category:', error);
    notificationStore.showNotification('Error updating category. Please try again later.', 'error');
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
.modal.show {
  display: block;
}

.hover-effect:hover {
  background-color: rgba(0, 123, 255, 0.1);
}

.table td, .table th {
  vertical-align: middle;
}

.invalid-feedback {
  display: none;
}

input:invalid ~ .invalid-feedback {
  display: block;
}
</style>
