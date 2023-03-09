<template>
  <v-card
    tile
  >
    <v-toolbar dense class="yellow" height="55" >

      <v-toolbar-title>{{ $tc('nav.title') }}</v-toolbar-title>

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
       
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="150"
        offset-y
        v-if="userExists"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            v-bind="attrs"
            v-on="on"
          >
              <v-avatar size="30" class="d-flex  align-center justify-center">
                <img :src="user.photosrc"/>
            </v-avatar>
          </v-btn>
        </template>
  
        <v-card >
          <v-list>
            <v-list-item class="d-flex justify-center mt-5" >
             <v-avatar color="#d9d9d9" size="40" class="d-flex  align-center justify-center">
              <img :src="user.photosrc"/>
            </v-avatar>
            </v-list-item>
  
            <v-list-item-content class="text-center">
                <v-list-item-title><h5>{{user.name}}</h5></v-list-item-title>
                <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
            </v-list-item-content>
  
        
          </v-list>
  
          <v-divider></v-divider>
  
          <v-list>
           <v-btn @click="signOut(); menu=false" text v-if="userExists" block>
            <v-icon>mdi-logout</v-icon>Cerrar sesión
          </v-btn>
          
          </v-list>
            
        </v-card>
      </v-menu>


    
  
    </v-toolbar>


  </v-card>
  
</template>

<script>
import products from '@/store/products';
import { mapState, mapActions, mapGetters } from "vuex"
 export default {
    name: 'Nav',
    data: function () {
    return {
      drawer: false,
      menu: false,
      // otras propiedades y métodos
    }},
    computed:{
        cantFavorites(){
            return products.getters.favoritesLength
        },
         cantProducts(){
          return products.state.cartLength
        },
    ...mapGetters(["userExists"]),
    ...mapState(["user"])
    },
     methods: {
    ...mapActions(["signOut"]),
  },
  }
</script>