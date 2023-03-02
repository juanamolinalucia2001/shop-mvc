<template>
  <v-card
    tile
  >
    <v-toolbar dense class="yellow" >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->

      <v-toolbar-title>Ecommerce</v-toolbar-title>

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

    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://img.freepik.com/vector-premium/diseno-logotipo-tienda-organica-inspirado_18099-270.jpg?w=2000"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Eccomerce</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          
        >
          <v-list-item-icon>
            <v-icon>mdi-like</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>caregorias</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


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
          return products.getters.cartLength
        }
    },
  }
</script>