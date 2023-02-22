<template>
<div>
  <h1 class="mt-5 text-center">Favorites</h1>
  <v-layout class="mt-5 align-center">
      <Favorites></Favorites>
  </v-layout>
</div>
</template>
<script>
import Favorites from '@/components/Favorites.vue'


  export default {
    name: 'FavoritesView',

    components: {
      Favorites,
    },
  }
</script>
