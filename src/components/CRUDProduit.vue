<script>
import axios from 'axios'

export default {
  data() {
    return {
      products: [],
      categories:[],
      SelectedCate:[],
    }
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = { 'Authorization': `Bearer ${token}` };
      axios.get('http://127.0.0.1:8000/api/v1/product', { headers })
        .then(response => {
          // console.log(response.data.data[0].categorie_title);
          this.products = response.data.data;
          
          
      const headers = { 'Authorization': `Bearer ${token}` };
      axios.get('http://127.0.0.1:8000/api/v1/categorie', { headers })
        .then(response => {
          // console.log( response.data.id);
          this.categories = response.data.data;
        })
        
   
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des produits:', error);
        });
    } else {

      this.$router.push('/login');
    }
    
   
  },
  
  methods: {
    getImageUrl(imagePath) {
      return `http://127.0.0.1:8000/storage/${imagePath}`;
    },
    deleteProduit(id) {
      const token = localStorage.getItem('token');
      if (token) {
        const headers = { 'Authorization': `Bearer ${token}` };
        axios.delete(`http://127.0.0.1:8000/api/v1/product/${id}`, { headers })
          .then(() => {
            this.products = this.products.filter(product => product.id !== id);
          })
          .catch(error => {
            console.error('Erreur lors de la suppression du produit:', error);
          });
      }
    },
    logout() {

      localStorage.removeItem('token');
      this.$router.push('/login');
    },
   
  
  },
  
  computed: {
  selectProduit() {
    if (this.SelectedCate.length === 0) {
      return this.products;
    } else {
      return this.products.filter(product => {
        return product.categorie_title.some(categorie => this.SelectedCate.includes(categorie));
      });
    }
  }
}

  
      


  
}
</script>

<template>
  <button><RouterLink to="/login" v-on:click="logout()">Se déconnecter</RouterLink></button> <br>
  <div>
    <div v-for="categorie in categories">
        
        <label for="categorie" >{{ categorie.title }}</label>
        <input type="checkbox"  v-model="SelectedCate" :value="categorie.title"  >
      </div>
      
         <br><br>
    <ul>
      <li v-for="product in  selectProduit " :key="product.id">
        Nom: {{ product.name }} <br>
        Description: {{ product.description }} <br>
        Price: {{ product.price }} <br>
        Stock: {{ product.stock }} <br>
        Image: <img :src="getImageUrl(product.image)" alt=""> <br>
        
        
      
        <li v-for="cate in product.categorie_title">
        Categorie: {{cate }} <br>
      </li>
      <br>

        <button v-on:click="deleteProduit(product.id)">Delete</button> <br>
        <button><router-link :to="'/editFormProduit/' + product.id">Editer un Produit</router-link></button>
        <br> <br> <br>
      </li>
    </ul>
  </div>
</template>
<style>
div {
  width: 100%;
  
  margin: 0 auto;
  padding: 0 20px; 
  box-sizing: border-box; 
  display: flex; 
  flex-direction: column; 
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

header {
  background-color: #f0f0f0;
  padding: 10px;
  height: 100vh;
  text-align: left;
}

label {
  font-weight: bold;
}

input[type="checkbox"] {
  margin-right: 5px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

a {
  text-decoration: none;
  color: #f7f7f7;
}

img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}
</style>
