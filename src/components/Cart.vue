<template>
<div>
    <v-simple-table  class="mr-5 ml-5">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            {{ $tc('cart.quantity')}}
          </th>
          <th class="text-left">
              {{ $tc('cart.nameProduct')}}
          </th>
          <th>
            {{ $tc('cart.price')}}
          </th>
          <th>
            {{ $tc('cart.actions')}}
          </th>
         
        </tr>
      </thead>
      
      <tbody>
        <tr
          v-for="(item) in cart" :key="item.id" 
        >
          <td>{{item.quantity}}</td>
          <td>{{item.title}}</td>
          <td>${{item.precio*item.quantity}}</td>
          <td><v-btn @click="deleteCart(index)" icon color="red"><v-icon>mdi-delete</v-icon></v-btn></td>
          </tr>
       <div class="d-flex justify-star" v-if="totalPriceCart>0">
          <v-btn @click="deleteAll" color="red" dark>{{ $tc('cart.empty')}} <v-icon>mdi-delete</v-icon></v-btn>
      </div>
      </tbody>
    </template>
  </v-simple-table>
      <div>
           <MultiStepForm  v-if="totalPriceCart>0"  />
      </div>
  
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