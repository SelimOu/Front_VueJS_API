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
  <header>
    
    <router-link v-if="isAuthenticated" to="/product">Tous les Produits</router-link>
    <router-view /><br><br>
  </header>
</template>

<style scoped>
</style>
