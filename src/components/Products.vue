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
          <td>{{item.precio}}</td>
          <td><v-btn class="red" dark @click="addFav(product)"><v-icon class="mdi-heart" >mdi-heart</v-icon></v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
         </div>

</template>
<script>
import products from '../store/products';
export default {
     created() {
            //hace un pedido de los productos
            products.dispatch('getProducts').then(() => {
                  console.log('productos cargados')
            })
      },
      computed: {
            allProducts() {
                  return products.state.allProducts
            },
      }
    
}
</script>
<style scoped>

</style>
