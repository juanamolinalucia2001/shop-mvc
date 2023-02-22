<template>
<div>
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
         
        </tr>
      </thead>
      
      <tbody>
        <tr
          v-for="item in cart" :key="item.id" 
        >
          <td>{{item.id}}</td>
          <td>{{item.title}}</td>
          <td>${{item.precio}}</td>
          </tr>
      
      </tbody>
    </template>
  </v-simple-table>
   <h3>Cantidad de productos :{{ cantidadProducts }}</h3>
  <h3>Total a pagar US${{totalPriceCart}}</h3>
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
            cart(){
              return products.state.cart
            },
            totalPriceCart(){
                return products.getters.cartTotal
            },
            cantidadProducts(){
                return products.getters.cartLength
            }

      },
    methods:{
      
    }
     
}
</script>