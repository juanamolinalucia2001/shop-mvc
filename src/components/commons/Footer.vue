<template>
  <v-footer
   color="yellow"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link  .id"
        text
        rounded
        class="my-2"
        :to="link.link"
      >
        {{ link.view }}
      </v-btn>
      <v-col
        class="yellow py-4 text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
  export default {
    data: () => ({
      links: [
        {id:1,view:'Home',link:'/'},
        {id:2,view:'Carrito', link:'/cart'},
        {id:3,view:'Favoritos', link:'/favorites'},
        {id:4,view:'Productos', link:'/products'}
      ],
    }),
  }
</script>