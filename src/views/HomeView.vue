<template>
  <v-container>
    <Carrusel/>
    <h1 class="mt-5 mb-5 text-center">Products</h1>
    <Products></Products>


  </v-container>
  
</template>

<script>
import Products from '@/components/Products.vue'
import Carrusel from '@/components/commons/Carrusel.vue'


  export default {
    name: 'Home',

    components: {
      Products,
      Carrusel

    },
  }
</script>
