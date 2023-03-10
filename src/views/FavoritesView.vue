<template>
<div>
  <h2 class="mt-5 text-center">{{$tc('favorites.title')}}</h2>
 
  <v-layout class="mt-5 align-center">
      <Favorites></Favorites>
  </v-layout>
</div>
</template>
<script>
import Favorites from '@/components/Favorites.vue'
import products from '../store/products';


  export default {
    name: 'FavoritesView',

    components: {
      Favorites,
    },
  
  }
</script>
