<template>
 <div class="container mx-auto">
    <v-card class="mr-5 ml-5 mt-5 mb-5" max-width="250" v-for="product in favorites"
             :key="product.id">
            <div class="card">
                    <div>
                        <v-img :src="product.imagen" alt="product image" contain max-height="200px"></v-img>
                    </div>
                    <v-card-title>{{ product.title }}</v-card-title>
                    <v-card-title>${{product.precio}}</v-card-title>
                       
            </div>
    </v-card>
</div>

</template>
<script>
import products from '../store/products';


export default {
    data(){
      return{
      }
    },
    computed: {  
            favorites(){
              return products.state.favorites
            }
      },
     
}
</script>
<style scoped>
.container{
    display: grid;
    grid-template-columns: auto auto auto auto;
}
.card{
      max-width: 250px;
      height: 400px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
}
</style>
