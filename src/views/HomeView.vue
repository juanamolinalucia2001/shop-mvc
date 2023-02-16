<template>
  <v-container>
    <Products></Products>
  </v-container>
  
</template>

<script>
import Products from '@/components/Products.vue'


  export default {
    name: 'Home',

    components: {
      Products,
    },
  }
</script>
