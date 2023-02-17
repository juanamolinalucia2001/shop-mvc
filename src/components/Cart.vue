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
          <th></th>
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
</div>
  
</template>
<script>
import products from '../store/products';


export default {
    data(){
      return{
        carrito:[]
      }
    },
    computed: {  
            cart(){
              return products.state.cart
            }
      },
    methods:{
        
    }
     
}
</script>