<template>
  <v-card
    tile
  >
    <v-toolbar dense class="yellow" >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Ecommerce</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    <v-spacer></v-spacer>
     <router-link to="/">
      <v-btn icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
     </router-link>

     <router-link to="/favorites">
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
     </router-link>

    <router-link to="/cart">
      <v-btn icon>
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </router-link>
    </v-toolbar>
  </v-card>
</template>
<script>
export default {
    
}
</script>