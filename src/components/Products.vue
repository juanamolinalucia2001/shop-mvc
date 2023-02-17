<template>
         <div class="card__container">
  <v-simple-table  class="mr-5 ml-5">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Product
          </th>
          <th class="text-left">
            Title
          </th>
          <th>
            Price
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in allProducts" :key="item.id" 
        >
          <td><img :src="item.imagen"  width="100px" height="100px"></td>
          <td>{{item.title}}</td>
          <td>${{item.precio}}</td>
          <td>
            <v-btn icon color="pink"  @click="addToFavorites(item)">
              <v-icon class="mdi-heart" >mdi-heart</v-icon>
            </v-btn>
            <v-btn color="yellow"  @click="addToCart(item)">
              comprar
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
         </div>

</template>
<script>
import products from '../store/products';

export default {
    data(){
      return{
        favs :[],
        cart:[]
      }
    },
     mounted() {
      //hace un pedido de los productos
      products.dispatch('getProducts').then(() => {
        console.log('productos cargados')
      })
      },
      computed: {
            allProducts(){
                  return products.state.allProducts
            },
            
            allFavs(){
              console.log(products.state.favorites)
              return products.state.favorites
            },

            allCart(){
              return products.state.cart
            }
      },
      methods:{
       addToFavorites(product) {
          this.favs.push(product)
          products.commit('setAddFavorites', this.favs)
      },
      addToCart(product){
        this.cart.push(product)
        products.commit('setAddCart', this.cart)
      }
      }
      
    
}
</script>
