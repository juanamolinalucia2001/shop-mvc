<template>
  <v-card
    tile
  >
    <v-toolbar dense class="yellow" >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->

      <v-toolbar-title>{{ $tc("nav.title") }}</v-toolbar-title>

    <v-spacer></v-spacer>
     
      <v-btn icon class="mt-3 ml-3" to="/">
      
           <v-icon>mdi-home</v-icon>
       
      </v-btn>
    

    
      <v-btn icon class="mt-3 ml-3"  to="/favorites">
         <v-badge
          color="red"
          :content="cantFavorites"
          :value="cantFavorites"
          overlap
        
        >
           <v-icon>mdi-heart</v-icon>
        </v-badge>
      </v-btn>
    

 
      <v-btn icon to="/cart" class="mt-3 ml-3 mr-3">
         <v-badge
          color="red"
          :content="cantProducts" 
          :value="cantProducts"
          overlap
        >
           <v-icon v-if="cantProducts>=0">mdi-cart</v-icon>
        </v-badge>
        
      </v-btn>
  
    </v-toolbar>


  </v-card>
  
</template>

<script>
import products from '@/store/products';
 export default {
    name: 'Nav',
    data: function () {
    return {
      drawer: false,
      // otras propiedades y métodos
    }},
    computed:{
        cantFavorites(){
            return products.getters.favoritesLength
        },
         cantProducts(){
          return products.state.cartLength
        }
    },
  }
</script>