<template>
  <div>
    <h1>Clothes List</h1>
    <ul v-if="clothes.length">
      <li v-for="cloth in clothes" :key="cloth.id">
        {{ cloth.name }} - {{ cloth.type }}
      </li>
    </ul>
    <p v-else>No clothes found.</p>
  </div>
</template>

<script>
export default {
  name: 'Cloth',
  props: {
    msg: String
  },
  data() {
    return {
      clothes: [] // Empty array to hold clothes data
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
  }
}
</script>

<style scoped>
/* You can add styles specific to this component */
</style>
