<template>
  <section>
    <form @submit.prevent="addProduit()" enctype="multipart/form-data" action="/">
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

      <button>Create Post</button>
    </form>
    <router-link to="/">Retour</router-link>

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
        description:  '',
        price: '',
        stock: '',
        image: '',
      
      },
      categories:[],
      selectCate:[],
      file: null 
    }
  },
  mounted(){
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


    
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    addProduit() {
      const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      };
      const formData = new FormData();
      formData.append('name', this.products.name);
      formData.append('description', this.products.description);
      formData.append('price', this.products.price);
      formData.append('stock', this.products.stock);
      formData.append('image', this.file)
      formData.append('categorie_id',this.selectCate)

      axios.post(`http://127.0.0.1:8000/api/v1/product`, formData, {headers})
        .then((response) => {
          // console.log(this.selectCate);
          this.file = null; 
          this.$router.push('/product')
      
        })
        .catch((error) => {
          console.error('Error adding product:', error);
        });
    }
  }
}
</script>

<style>

</style>
