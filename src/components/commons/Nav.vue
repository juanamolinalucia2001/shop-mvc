<template>
  <v-card
    tile
  >
    <v-toolbar dense class="yellow" >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Ecommerce</v-toolbar-title>

    <v-spacer></v-spacer>
     <router-link to="/" class="none">
      <v-btn icon class="mt-3">
      
           <v-icon>mdi-home</v-icon>
       
      </v-btn>
     </router-link>

     <router-link to="/favorites">
      <v-btn icon class="mt-3">
         <v-badge
          color="red"
          :content="cantFavorites"
        >
           <v-icon>mdi-heart</v-icon>
        </v-badge>
      </v-btn>
     </router-link>

    <router-link to="/cart" class="mt-3">
      <v-btn icon>
         <v-badge
          color="red"
          :content="cantProducts" 
        >
           <v-icon v-if="cantProducts>=0">mdi-cart</v-icon>
        </v-badge>
        
      </v-btn>
    </router-link>
    </v-toolbar>
  </v-card>
</template>
<script>
import products from '@/store/products';
 export default {
    name: 'Nav',
    data:{
      
    },
    computed:{
        cantFavorites(){
            return products.getters.favoritesLength
        },
         cantProducts(){
          return products.getters.cartLength
        }
    }
  }
</script>