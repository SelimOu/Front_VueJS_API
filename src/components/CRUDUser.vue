<script>
import axios from 'axios'


export default {
  data(){
    return{
      users:[],
      password: ''
    }
  },
  mounted() {

    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
      if (token) {
        const headers = { 'Authorization': `Bearer ${token}` };
   axios
      .get(`http://127.0.0.1:8000/api/v1/user/${id}`,{headers})
      .then((response) => {
        this.users = response.data.data
        // console.log(this.users);
      })
    }
      
      
  },
  methods: {
    
  deleteUser(id) {
    const token = localStorage.getItem('token');
    
      if (token) {
        const headers = { 'Authorization': `Bearer ${token}`};
   axios
      .delete(`http://127.0.0.1:8000/api/v1/user/${id}`,{headers})
    }
  },
  editUser() {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
      if (token) {
        const headers = { 'Authorization': `Bearer ${token}`,"Content-type": 'application/json' };
      const formData = new FormData();
      formData.append('name', this.users.name);
      formData.append('email', this.users.email);
      formData.append('password', this.users.password);

      axios.put(`http://127.0.0.1:8000/api/v1/user/${id}`, formData, {headers})
        .then((response) => {
          // console.log(response);
          this.users = {
            name: '',
            email: '',
            password: '',
            
          };
          
          this.$router.push('/product')
        })
       ;
    }
}
  }}


</script>

<template>
  
  <section class="full-height">
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
        <input type="password" name="password" id="password" v-model="users.password">
      </div>
      <br>
      <button>Edit User</button>
      <br>
    </form> <br>
  <button><router-link to="/product">Retour</router-link></button>

  <routerView /><br><br>
  </section>
</template>

<style>


</style>