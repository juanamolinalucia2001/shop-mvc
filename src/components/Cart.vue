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
          <th>Actions</th>
         
        </tr>
      </thead>
      
      <tbody>
        <tr
          v-for="item in cart" :key="item.id" 
        >
          <td>{{item.id}}</td>
          <td>{{item.title}}</td>
          <td>${{item.precio}}</td>
          <td><v-btn @click="deleteCart(item.id)"><v-icon>mdi-delete</v-icon></v-btn></td>
          </tr>
      
      </tbody>
    </template>
  </v-simple-table><br>
  <button @click="deleteAll">Delete Cart</button>
  <br>
  <h3 class="text-center" v-if="totalPriceCart>0">Total a pagar US${{totalPriceCart}}</h3>
    <br>
     
    <MultiStepForm />
 
  
</div>
  
</template>
<script>
import products from '../store/products';
import  MultiStepForm from '@/components/commons/ModalForm.vue'


export default {
    data(){
      return{
       

      }
    },
    components:{
       MultiStepForm,
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
      deleteCart(index){
        products.commit('deleteProduct', index)
      },
      deleteAll(){
        products.commit('deleteAll')
      }
    }
     
}
</script>