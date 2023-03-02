<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <vue-paycard :value-fields="valueFields" />
      </v-col>
      <v-col cols="6">
            <v-form @submit.prevent="submit" class="mt-5" ref="formCard" v-model="value">
    
      <v-text-field v-model="valueFields.cardNumber" label="Card number" required
      :rules="[rules.required, rules.cardNumber.formattedValue]">
      </v-text-field>
       <v-text-field v-model="valueFields.cardName" label="Name on card" 
       :rules="[rules.required, rules.cardName]" required></v-text-field>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="valueFields.cardMonth" label="Expiration month (MM)" required
            :rules="[rules.required, rules.expirationMonth]"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="valueFields.cardYear" label="Expiration year (YYYY)" 
            :rules="[rules.required, rules.expirationYear]" required></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="valueFields.cardCvv" label="CVV" 
          :rules="[rules.required, rules.cvv]" required
          ></v-text-field>
        </v-col>
      </v-row>
      
    
    </v-form>
       
      </v-col>
       
    </v-row>
   
  </v-container>
</template>

<script>
import VuePaycard from 'vue-paycard';
import products from '@/store/products';

export default {
  components: {
    VuePaycard,
  },
  data() {
    return {
        value:true,

    };
  },
  computed: {
     valueFields(){
      return products.state.valueFields
  }
  },
  methods: {
    submit () {
        this.$refs.formCard.validate()
        console('hola')
      },
    
     
    validateForm(){
      products.state.formValid = this.$refs.formCard.validate()
     // let valid = this.$refs.form.validate()
     console('hola'+products.state.formValid)
      if(products.state.formValid) {
        console.log("valido")

      } else {
       console.log("datos invalidos")
      }
  }
},
  
};
</script>
<style>
.unEstilo{
  display: flex;
  flex-wrap: wrap;
  max-width: 80%;
  background: red;
}
</style>
