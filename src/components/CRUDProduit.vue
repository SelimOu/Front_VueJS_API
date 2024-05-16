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
    filter() {
    this.$nextTick(() => {
      this.selectProduit;
    });
  }
  },
  
  computed: {
  selectProduit() {
    if (this.SelectedCate.length === 0) {
      return this.products;
    } else {
      return this.products.filter(product => {
        return product.categorie_title.some(category => this.SelectedCate.includes(category));
      });
    }
  }
}

  
      


  
}
</script>

<template>
  <header><RouterLink to="/login" v-on:click="logout()">Se déconnecter</RouterLink> <br></header>
  <div>
    <div v-for="categorie in categories">
        
        <label for="categorie" >{{ categorie.title }}</label>
        <input type="checkbox"  v-model="SelectedCate" :value="categorie.title"  @change="filter">
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
