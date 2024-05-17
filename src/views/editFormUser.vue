<template>
    <section>
      <form @submit.prevent="editUser()" >
        <div>
          <label for="userId">Name: </label>
          <input type="text" id="name" v-model="users.name">
        </div>
        <div>
          <label for="title">Email: </label>
          <input type="email" id="email" v-model="users.email">
        </div>
        <div>
          <label for="body">Password: </label>
          <input type="text" name="password" id="password" v-model="users.password">
        </div>
        
        <button>Edit User</button>
      </form>
       <button><router-link to="/users">Retour</router-link></button>
  
    <routerView /><br><br>
    </section>
  </template>
  
  <script>
import axios from 'axios'

export default {
  data() {
    return {
      users: {
        name: '',
        email: '',
        password: '',
        
      }
    }
  },
  mounted() {
    this.fetchUserDetails();
  },
  methods: {
    fetchUserDetails() {
        const headers = {
        'Authorization':  `Bearer ${store.state.user.token}`, 
        "Content-type": 'multipart/form-data'
      };
      
      const UserId = this.$route.params.id;
      axios.get(`http://127.0.0.1:8000/api/v1/user/${UserId}`,{headers})
        .then(response => {
          this.users = response.data.data;
        });
    },
    editUser() {
      const headers = {
        'Authorization':  `Bearer ${store.state.user.token}`, 
        "Content-type": 'application/json'
      };
      const formData = new FormData();
      formData.append('name', this.users.name);
      formData.append('email', this.users.email);
      formData.append('password', this.users.password);

      axios.put(`http://127.0.0.1:8000/api/v1/user/${this.$route.params.id}`, formData, {headers})
        .then((response) => {
          console.log(response);
          this.users = {
            name: '',
            email: '',
            password: '',
            
          };
          
          this.$router.push('/users')
        })
       ;
    }
  }
}
</script>

<style>
  
</style>
