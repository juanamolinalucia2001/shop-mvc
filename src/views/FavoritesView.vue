<template>
  <div class="mt-2">
    <h2>Favoritos</h2>
      <Favorites></Favorites>
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
