<template>
  <v-card class="mx-5 my-2">
    <v-simple-table class="max-height-table">
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
          v-for="(item, index) of cart" :key="item.id" 
        >
          <td>{{item.quantity}}</td>
          <td>{{item.title}}</td>
          <td>${{item.precio*item.quantity}}</td>
          <td><v-btn @click="deleteItem(index, item.quantity)" icon color="red"><v-icon>mdi-delete</v-icon></v-btn></td>
          </tr>
      </tbody>
    </template>
  </v-simple-table>
  
  
      <div class="mb-5">
          <div class="d-flex justify-end " v-if="totalPriceCart>0">
          <v-btn  @click="deleteAll" color="red" class="ma-auto" dark small  >{{ $tc('cart.empty')}} <v-icon small>mdi-delete</v-icon></v-btn>
      </div>
           <MultiStepForm  v-if="totalPriceCart>0"  class="ml-5 mr-5"   />
      </div>
      
            
  
  </v-card>


  
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
        deleteItem(index, cantidad){
        products.commit('deleteProduct', {index, cantidad})
      },
      deleteAll(){
        products.commit('deleteAll')
      }
    }
     
}
</script>
<style>
.max-height-table {
  max-height: 300px;
  overflow-y: auto;
}
</style>