<template>
  <v-app>
    <Nav></Nav>
    <v-main>
      <router-view/>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Nav from '@/components/commons/Nav.vue'
import Footer from '@/components/commons/Footer.vue'

export default {
  name: 'App',
  data(){
    return{
      mensaje:'hola'
    }
  },
  components:{
    Nav,
    Footer
  },
  methods:{

  }
};
</script>
