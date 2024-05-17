<script>
import axios from 'axios'

export default {
  data() {
    return {
      welcome:'',
     
    }
  },
  mounted() {
    
      
      axios.get('http://127.0.0.1:8000/api/v1/welcome',)
        .then(response => {
          // console.log(response.data);
          this.welcome = response.data;
          
          
      
        
   
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des produits:', error);
        });
    
  }
}
</script>

<template>
  <br>
  <button><router-link to="/login">Login</router-link></button>
  <br>
  <button><router-link to="/register">Inscription</router-link></button>
  <p>{{ this.welcome}}</p>


</template>
