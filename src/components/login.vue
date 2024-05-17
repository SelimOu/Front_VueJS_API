<template>
    <div>
        <button><router-link to="/">Home</router-link></button>
        <routerView /><br><br>
        <h1>Se connecter</h1>
        <form @submit.prevent="login">
            <label for="Username">Username: </label>
            <input type="email" name="email" v-model="email"><br>
            <label for="Password">Password: </label>
            <input type="password" name="password" v-model="password"><br>
            <button type="submit">Se connecter</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        login() {
            axios.post('http://127.0.0.1:8000/api/v1/login', {
                email: this.email,
                password: this.password
            })
                .then(res => {
                    console.log(res.data[0].id);
                    localStorage.setItem('token',res.data[1])
                    localStorage.setItem('id',res.data[0].id)
                    this.$router.push('/product')
                })
                .catch(err => console.log(err));
                
        }
    }
}
</script>

