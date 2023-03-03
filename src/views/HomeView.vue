<template>
  <v-container class="mt-3 text-center">
    <Carrusel/>
    <v-btn to="/products" class="yellow" block>{{ $tc('products.buy')}} <v-icon>mdi-cart</v-icon></v-btn>
    <br>

  </v-container>
  
</template>

<script>
import Products from '@/components/Products.vue'
import Carrusel from '@/components/commons/Carrusel.vue'


  export default {
    name: 'Home',

    components: {
      Products,
      Carrusel,

    },
  }
</script>
