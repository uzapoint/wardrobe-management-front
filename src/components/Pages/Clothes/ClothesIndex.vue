<template>
    <div class="container mt-4">
        <h1 class="text-center mb-4">Clothes List</h1>
        <div class="row">
            <div v-for="item in clothes" :key="item.id" class="col-md-4 mb-3">
                <div class="card h-100 shadow-sm">
                    <img :src="getImageUrl(item.image)" alt="Clothing Image" class="card-img-top" />
                    <div class="card-body">
                        <h5 class="card-title">{{ item.name }}</h5>
                        <p class="card-text">Size: {{ item.size }}</p>
                        <p class="card-text">Color: {{ item.color }}</p>
                        <p class="card-text">Category: {{ item.category.name }}</p>
                        <p class="card-text"><small>Added by: {{ item.user.name }}</small></p>
                        <div class="d-flex justify-content-between mt-3">
                            <button class="btn btn-info" @click="viewCloth(item)">View</button>
                            <button class="btn btn-warning" @click="editCloth(item)">Edit</button>
                            <button class="btn btn-danger" @click="deleteCloth(item.id)">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="pagination d-flex justify-content-between mt-4">
            <button @click="fetchClothes(data.prev_page_url)" :disabled="!data.prev_page_url" class="btn btn-secondary">Previous</button>
            <span>Page {{ data.current_page }} of {{ data.last_page }}</span>
            <button @click="fetchClothes(data.next_page_url)" :disabled="!data.next_page_url" class="btn btn-secondary">Next</button>
        </div>

        <div v-if="selectedCloth" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Cloth Details</h5>
                        <button type="button" class="btn-close" @click="selectedCloth = null"></button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <p><strong>Name:</strong> {{ selectedCloth.name }}</p>
                            <p><strong>Size:</strong> {{ selectedCloth.size }}</p>
                            <p><strong>Color:</strong> {{ selectedCloth.color }}</p>
                            <p><strong>Category:</strong> {{ selectedCloth.category.name }}</p>
                            <p><strong>Added by:</strong> {{ selectedCloth.user.name }}</p>
                            <p><strong>Created At:</strong> {{ formatDate(selectedCloth.created_at) }}</p>
                            <p><strong>Updated At:</strong> {{ formatDate(selectedCloth.updated_at) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="editClothItem" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Cloth</h5>
                        <button type="button" class="btn-close" @click="editClothItem = null"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="updateCloth">
                            <div class="mb-3">
                                <label for="cloth_name" class="form-label">Name</label>
                                <input type="text" id="cloth_name" v-model="editClothItem.name" class="form-control" required />
                            </div>
                            <div class="mb-3">
                                <label for="cloth_size" class="form-label">Size</label>
                                <input type="text" id="cloth_size" v-model="editClothItem.size" class="form-control" required />
                            </div>
                            <div class="mb-3">
                                <label for="cloth_color" class="form-label">Color</label>
                                <input type="text" id="cloth_color" v-model="editClothItem.color" class="form-control" required />
                            </div>
                            <div class="mb-3">
                                <label for="cloth_category" class="form-label">Category</label>
                                <select id="cloth_category" v-model="editClothItem.category_id" class="form-select" required>
                                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="cloth_image" class="form-label">Image</label>
                                <input type="file" id="cloth_image" @change="onImageChange" class="form-control" />
                            </div>
                            <button type="submit" class="btn btn-primary">Update Cloth</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="notificationStore.notification" :class="`alert alert-${notificationStore.notification.type}`" class="mt-3">
            {{ notificationStore.notification.message }}
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/userState';
import { useNotificationStore } from '@/stores/notificationStore';

const clothes = ref([]);
const selectedCloth = ref(null);
const editClothItem = ref(null);
const data = ref({
    current_page: 1,
    last_page: 1,
    prev_page_url: null,
    next_page_url: null,
});
const categories = ref([]);
const userStore = useUserStore();
const notificationStore = useNotificationStore();
const BASE_URL = 'http://127.0.0.1:8000';
const token = userStore.getToken;

const onImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        editClothItem.value.image = file;
    }
};


const getImageUrl = (imagePath) => {
  return imagePath.startsWith('https://') 
    ? imagePath 
    : `${BASE_URL}/${imagePath}`;
};

const fetchClothes = async (url = `${BASE_URL}/api/clothes?page=1`) => {
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.data.success) {
            clothes.value = response.data.data.data;
            data.value = response.data.data;
        }
    } catch (error) {
        console.error('Error fetching clothes:', error);
    }
};

const fetchCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/categories`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.data.success) {
            categories.value = response.data.data;
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

fetchClothes();
fetchCategories();

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const viewCloth = (item) => {
    selectedCloth.value = item;
};

const editCloth = (item) => {
    editClothItem.value = { ...item };
};

const updateCloth = async () => {
    try {
        const response = await axios.put(`${BASE_URL}/api/clothes/${editClothItem.value.id}`, editClothItem.value, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.data.success) {
            notificationStore.showNotification(response.data.message, 'success');
            fetchClothes();
            editClothItem.value = null;
        } else {
            notificationStore.showNotification(response.data.message, 'error');
        }
    } catch (error) {
        console.error('Error updating cloth:', error);
        notificationStore.showNotification('An error occurred while updating the cloth.', 'error');
    }
};

const deleteCloth = async (id) => {
    if (confirm('Are you sure you want to delete this cloth?')) {
        try {
            const response = await axios.delete(`${BASE_URL}/api/clothes/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            notificationStore.showNotification('Cloth deleted successfully!', 'success');
            fetchClothes();
            
            if (response.data === '') {
                notificationStore.showNotification('Cloth deleted successfully!', 'success');
                fetchClothes();
            } else {
                notificationStore.showNotification(response.data.message, 'error');
            }
        } catch (error) {
            console.error('Error deleting cloth:', error);
            notificationStore.showNotification('An error occurred while deleting the cloth.', 'error');
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
}

.card {
    transition: transform 0.2s;
}

.card:hover {
    transform: scale(1.05);
}

.pagination {
    margin-top: 20px;
}

.modal-content {
    border-radius: 0.5rem;
}

.alert {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 300px;
    z-index: 1050;
}
</style>
