<template>
 <v-row class="d-flex justify-center mt-5"   >
  <v-dialog v-model="showModal" max-width="1000" class="mt-5">
     <template v-slot:activator="{ on, attrs }" >
      <h3 class="ml-5 mr-5 ">Total a pagar US${{totalPriceCart}}</h3>
        <v-btn
          color="yellow"
          dark
          v-bind="attrs"
          v-on="on"
        >
          {{ $tc('multiStep.buyProducts')}}
        </v-btn>
      </template>
        <div>
        <v-stepper v-model="step"  height="550" max-width="1000" >
            <!-- Header form multi-step  -->
          <v-stepper-header>
            <v-stepper-step :complete="step > 1" step="1"></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 2" step="2"></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 3" step="3"></v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
              <!-- Content step 1  -->
            <v-stepper-content step="1">
              <v-container class="text-center">
                  <v-img width="100" style="margin: auto;" class="mt-5 mb-5" src="https://media.tenor.com/8klrp86awEYAAAAC/cart.gif"></v-img>

                  <h1 class="mt-5 mb-5">Monto total a pagar ${{totalPriceCart}}</h1>

                <v-btn @click="step++" outlined color="green">{{ $tc('multiStep.btnNext')}}</v-btn>
              </v-container>
            </v-stepper-content>

            <!-- Content step 2 -->
            <v-stepper-content step="2">
                <h2>{{$tc('multiStep.step2')}}</h2>
              <CardCredit/>
               <v-btn @click="step--"  outlined color="indigo">{{ $tc('multiStep.btnBack')}}</v-btn>
                <v-btn  @click="agregarCompra();" outlined color="green" :disabled="!formValid">{{ $tc('multiStep.btnNext')}}</v-btn>
                
            </v-stepper-content>

            <!-- Content step 3  -->
            <v-stepper-content step="3">
                <v-container class="text-center" >
                  <v-row>
                    <v-col cols="12">
                       
                      <h1>Pago realizado con exito</h1>
                       <v-img class="mb-5" style="margin: auto;" width="150" src="https://gifdb.com/images/thumbnail/correct-verified-green-circle-check-mark-a8cbemi51csojpmt.gif"></v-img>
                      
                    </v-col>
                    <v-col cols="12" class="mt-5">
                       <h2>Gracias por tu compra</h2>
                    
                    </v-col>
                    <v-col>
                        <v-btn @click="submitForm" outlined color="red">Close</v-btn>
                    </v-col>
                    
                  </v-row>
                </v-container>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
        </div>
  </v-dialog>
   </v-row>
</template>

<script>
import CardCredit from '@/components/commons/CardCredit.vue';
import products from '@/store/products';
import { mapState, mapActions} from "vuex";

export default {
  props: {
    isValid: Boolean,
  },
  data() {
    return {
      showModal: false,
      step: 1,
    }
    
  },
   components:{
    CardCredit
  },
  methods: {
     ...mapActions(['agregarProducto','updateStock']),
    submitForm() {
      this.showModal = false
      this.step=1
      
    },
    
      agregarCompra(){
      let lista=[]
      lista.push(this.cart);
      this.agregarProducto({ compra: lista, uid: this.user.uid, photourl: this.user.photosrc,displayName:this.user.name, email:this.user.email, provider:this.user.provider})
      const lista1 = this.cart.map(item => ({ id: item.id, quantity: item.quantity }));
      this.$store.dispatch('updateStock', lista1);
      
       this.step++;
    }
  
   
  },
  computed:{
     totalPriceCart(){
                return products.getters.cartTotal
            },
      formValid(){
        return products.state.formValid
      },
      deleteAll(){
        products.commit('deleteAll')
      },
      cart(){
              return products.state.cart
        },
      ...mapState(["user"])

      
      
  }
}
</script>
