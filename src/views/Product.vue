<script setup>
import CRUDProduit from "@/components/CRUDProduit.vue";

</script>

<template>
<header>
    <router-link to="/formProduit">Ajouter un Produit</router-link>
    <button><router-link :to="'/user'">Mon Profil</router-link></button>
   
</header>
  <CRUDProduit/>

</template>
