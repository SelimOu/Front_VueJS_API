<template>
    <section>
      <form @submit.prevent="editProduit()" enctype="multipart/form-data" action="/">
        <div>
          <label for="userId">Name: </label>
          <input type="text" id="name" v-model="products.name">
        </div>
        <div>
          <label for="title">Description: </label>
          <input type="description" id="description" v-model="products.description">
        </div>
        <div>
          <label for="body">Price: </label>
          <input type="number" name="price" id="price" v-model="products.price">
        </div>
        <div>
          <label for="body">Stock: </label>
          <input type="number" name="stock" id="stock" v-model="products.stock">
        </div>
        <div>
          <label for="file">Upload Image:</label>
          <input type="file" name="image" id="image" accept="image/*" @change="onFileChange">
        </div>
        <label for="cate">categories:</label>
      <div v-for="categorie in categories">
        
        <label for="categorie" >{{ categorie.title }}</label>
        <input type="checkbox"  v-model="selectCate" :value="categorie.id">
      </div>
        <button>Edit Product</button>
      </form>
      <router-link to="/product">Retour</router-link>

  <routerView /><br><br>
    </section>
</template>
  
<script>
import axios from 'axios'

export default {
  data() {
    return {
      products: {
        name: '',
        description: '',
        price: '',
        stock: '',
        image: '',
      },
      categories:[],
      selectCate:[],
      file: null 
    }
  },
  mounted() {
    this.fetchProductDetails();
    this.allcategorie();
  },
  methods: {
    allcategorie(){
      const headers = { 'Authorization': `Bearer ${localStorage.getItem('token') }`};
      axios.get('http://127.0.0.1:8000/api/v1/categorie', { headers })
        .then(response => {
          // console.log(response.data.data);
          this.categories = response.data.data;
        })
      },
    fetchProductDetails() {
        const headers = {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        "Content-type": 'multipart/form-data'
      };
      
      const productId = this.$route.params.id;
      axios.get(`http://127.0.0.1:8000/api/v1/product/${productId}`,{headers})
        .then(response => {
          this.products = response.data.data;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des détails du produit:', error);
        });
    },
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    editProduit() {
      const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        "Content-type": 'multipart/form-data'
      };
      const formData = new FormData();
      formData.append('name', this.products.name);
      formData.append('description', this.products.description);
      formData.append('price', this.products.price);
      formData.append('stock', this.products.stock);
      formData.append('image', this.file);
      formData.append('categorie_id',this.selectCate)
      formData.append('_method', 'PUT');

      axios.post(`http://127.0.0.1:8000/api/v1/product/${this.$route.params.id}?_method=PUT`, formData, {headers})
        .then((response) => {
          // console.log(response);
          this.products = {
            name: '',
            description: '',
            price: '',
            stock: '',
            image: ''
          };
          console.log(this.file);
          this.file = null; 
          this.$router.push('/product')
        })
        .catch(error => {
          console.error('Erreur lors de l\'édition du produit:', error);
        });
    }
  }
}
</script>

<style>
  
</style>
