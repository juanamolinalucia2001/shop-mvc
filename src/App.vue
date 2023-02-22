<template>
  <v-app>
    <Nav></Nav>
    
    <Footer></Footer>
  </v-app>
</template>

<script>
import Nav from '@/components/commons/Nav.vue'
import Footer from '@/components/commons/Footer.vue'

export default {
  name: 'App',

  data: () => ({
    //
  }),
  components:{
    Nav,
    Footer
  }
};
</script>
