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
        :key="link"
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
        {view:'Home',link:'/'},
        {view:'Cart', link:'/cart'},
        {view:'Favorites', link:'/favorites'},
        {view:'Products', link:'/'}
      ],
    }),
  }
</script>