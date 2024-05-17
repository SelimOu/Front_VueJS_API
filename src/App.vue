<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isAuthenticated = localStorage.getItem('token')

if (!isAuthenticated && route.path === '/product') {
  router.push('/login')
}
</script>

<template>
  
    
   <button> <router-link v-if="isAuthenticated" to="/product">Tous les Produits</router-link></button>
    <router-view /><br><br>
  
</template>

<style scoped>
</style>
