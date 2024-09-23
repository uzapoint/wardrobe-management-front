<template>
  <div>
    <h1>Clothes List</h1>
    <ul v-if="clothes.length">
      <li v-for="cloth in clothes" :key="cloth.id">
        {{ cloth.name }} 
        {{ cloth.color }} 
        {{ cloth.size }} 
        {{ cloth.category }}
        {{ cloth.id }}  <button @click="editCloth">Edit</button>
        
      </li>
    </ul>
    <p v-else>No clothes found.</p>
  </div>
  <!-- submit a new clothe-->
<form @submit.prevent="submitCloth">
  <input type="text" v-model="newCloth.name" placeholder="Cloth name" required>
  <input type="text" v-model="newCloth.category" placeholder="Cloth type" required>
  <input type="text" v-model="newCloth.color" placeholder="Cloth color" required>
  <input type="text" v-model="newCloth.size" placeholder="Cloth size" required>
  <button type="submit">Add Cloth</button>
</form>
<!-- edit a clothe added -->
  <form @submit.prevent="editCloth">
  <input type="text" v-model="newCloth.name" placeholder="Cloth name" required>
  <input type="text" v-model="newCloth.category" placeholder="Cloth type" required>
  <input type="text" v-model="newCloth.color" placeholder="Cloth color" required>
  <input type="text" v-model="newCloth.size" placeholder="Cloth size" required>
  <button type="submit">Edit Cloth</button>
</form>
<!-- delete a clothe f-->
 
</template>


<script>
import axios from 'axios';

export default {
  name: 'ClothItem',
  props: {
    msg: String
  },
  data() {
    return {
      clothes: [],
    }
  },
  created() {
    // Fetching data from the backend
    fetch('http://127.0.0.1:8000/clothes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.clothes = data; // Assign fetched data to clothes
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  },
  methods: {
    submitCloth() {
      // Post request to the backend
      axios.post('http://127.0.0.1:8000/clothes', this.newCloth)
        .then(response => {
          console.log(response.data);
          this.clothes.push(response.data); // Add new cloth to the clothes array
          this.newCloth = {}; // Clear the form
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    },
      editCloth() {
        // Post request to the backend
        axios.put('http://127.0.0.1:8000/clothes', this.newCloth)
          .then(response => {
            console.log(response.data);
            this.clothes.push(response.data); // Add new cloth to the clothes array
            this.newCloth = {}; // Clear the form
          })
          .catch(error => {
            console.error('There was an error!', error);
          });

    },


  }
}


    

</script>
