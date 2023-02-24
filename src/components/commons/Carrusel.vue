<template>
  <v-carousel
     cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
    class="mb-5"
  >
    
   <v-carousel-item
      v-for="(item) in items"
      :key="item.id"
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
            id:1,src:'https://mayorista.quinotoshop.com.ar/wp-content/uploads/2023/02/BANNER-MAYORISTA-NEW-IN.jpg',
          },
          {
            id:2,src: 'https://i0.wp.com/blog.claroshop.com/wp-content/uploads/2022/01/DnjNHdFUcAAF1iL.png?fit=1024%2C512&ssl=1',
          },
          {
            id:3,src: 'https://mott.social/wp-content/uploads/2020/07/7-consejos-para-comprar-joyas-de-oro-como-regalo-a-una-mujer-1-1280x720.png',
          },
          {
            //src: 'https://i.ytimg.com/vi/jYyf0nrughI/maxresdefault.jpg',
            id:4,src:'https://mayorista.quinotoshop.com.ar/wp-content/uploads/2023/01/AVISO-WEB-1.jpg',
          },
        ],
      }
    },
  }
</script>