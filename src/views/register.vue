<template>
    <section>
      <form @submit.prevent="register()" enctype="multipart/form-data" action="/">
        <div>
          <label for="userId">Name: </label>
          <input type="text" id="name" v-model="name">
        </div>
        <div>
          <label for="title">Email: </label>
          <input type="email" id="email" v-model="email">
        </div>
        <div>
          <label for="body">Password: </label>
          <input type="text" name="password" id="password" v-model="password">
        </div>
        
        <button>Create User</button>
      </form>
      <button><router-link to="/">Retour</router-link></button>
  
    <routerView /><br><br>
    </section>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
      data() {
          return {
              name: '',
              email: '',
              password: '',
              
          }
      },
      methods: {
          register() {
              axios.post('http://127.0.0.1:8000/api/v1/register', {
                  name: this.name,
                  email: this.email,
                  password: this.password
              })
                  .then(res => {
                      
                      localStorage.setItem('token',res.data.auth_token)
                      this.$router.push('/product')
                  })
                  .catch(err => console.log(err));
                  
          }
      }
  }
  </script>
  
  <style>
  
  </style>
  