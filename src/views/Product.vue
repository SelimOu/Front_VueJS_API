<script setup>
import CRUDProduit from "@/components/CRUDProduit.vue";

</script>

<template>

    <button> <router-link to="/formProduit">Ajouter un Produit</router-link></button> <br> <br>
    <button><router-link :to="'/user'">Mon Profil</router-link></button>
   

  <CRUDProduit/>

</template>
