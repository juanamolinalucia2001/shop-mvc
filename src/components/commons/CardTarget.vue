<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <vue-paycard :value-fields="valueFields" />
      </v-col>
      <v-col cols="6">
            <v-form @submit.prevent="validateForm" class="mt-5">
    
      <v-text-field v-model="valueFields.cardNumber" label="Card number" required
      :rules="[rules.required, rules.cardNumber]">
      </v-text-field>
       <v-text-field v-model="valueFields.cardName" label="Name on card" 
       :rules="[rules.required]" required></v-text-field>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="valueFields.cardMonth" label="Expiration month (MM)" required
            :rules="[rules.required, rules.expirationMonth]"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="valueFields.cardYear" label="Expiration year (YY)" 
            :rules="[rules.required, rules.expirationYear]" required></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="valueFields.cardCvv" label="CVV" 
          :rules="[rules.required, rules.cvv]" required
          ></v-text-field>
          <v-btn type="submit">check cart<v-icon>mdi-cash-check</v-icon></v-btn>
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
import { required, maxLength, minLength, numeric, between } from 'vuelidate/lib/validators';

export default {
  components: {
    VuePaycard,
  },
  data() {
    return {

       rules: {
        required: (value) => !!value || 'Este campo es requerido',
        cardNumber: (value) => /^([0-9]{4}){3}[0-9]{4}$/.test(value) || 'Ingrese un número de tarjeta de crédito válido',
        expirationMonth: (value) => /^(0?[1-9]|1[0-2])$/.test(value) || 'Ingrese un mes de vencimiento válido (MM)',
        expirationYear: (value) => /^20\d{2}$/.test(value) || 'Ingrese un año de vencimiento válido (YYYY)',
        cvv: (value) => /^[0-9]{3,4}$/.test(value) || 'Ingrese un CVV válido',
      }
    };
  },
  computed: {
     valueFields(){
      return products.state.valueFields
  }
  },
  methods: {
     
    validateForm(){
    // Recorrer todos los campos y verificar si cumplen con las reglas de validación
    for (let field in this.valueFields) {
      let value = this.valueFields[field];
      let rules = this.rules[field];
      if (rules) {
        for (let rule in rules) {
          if (!rules[rule](value)) {
            // Mostrar un mensaje de error y detener la validación si algún campo no es válido
          
            donsole.log(error)
          }
        }
      }
    }
     console.log("enviado con exito")
     products.commit('setUpdateForm', true)
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
