<template>
  <v-container>
    <h1 class="mt-5  text-center">{{ $tc('products.title')}} </h1>
    <Products></Products>


  </v-container>
  
</template>

<script>
import Products from '@/components/Products.vue'



  export default {
    name: 'ProductsView',

    components: {
      Products,

    },
    data(){
      return{
        visible:false
      }
    }
  }
</script>
