<template>
  <v-carousel
    cycle
    height="600"
    width="1300"
    hide-delimiter-background
    show-arrows="hover"
    class="mb-5"
  >
   <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      cover
    ></v-carousel-item>
  </v-carousel>
</template>
<script>
  export default {
    data () {
      return {
        items: [
          {
            src:'https://mayorista.quinotoshop.com.ar/wp-content/uploads/2023/02/BANNER-MAYORISTA-NEW-IN.jpg',
          },
          {
            src: 'https://i0.wp.com/blog.claroshop.com/wp-content/uploads/2022/01/DnjNHdFUcAAF1iL.png?fit=1024%2C512&ssl=1',
          },
          {
            src: 'https://mott.social/wp-content/uploads/2020/07/7-consejos-para-comprar-joyas-de-oro-como-regalo-a-una-mujer-1-1280x720.png',
          },
          {
            //src: 'https://i.ytimg.com/vi/jYyf0nrughI/maxresdefault.jpg',
            src:'https://mayorista.quinotoshop.com.ar/wp-content/uploads/2023/01/AVISO-WEB-1.jpg',
          },
        ],
      }
    },
  }
</script>