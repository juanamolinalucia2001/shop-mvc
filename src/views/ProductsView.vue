<template>
  <v-container>
   
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
