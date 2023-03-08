<template>
  <v-container>
    <v-row>
      <v-col cols="8"  md="6">
        <vue-paycard :value-fields="valueFields" />
      </v-col>
      <v-col cols="4" md="6">
     
  <form>
    <v-text-field
      v-model="valueFields.cardName"
      :error-messages="cardNameErrors"
      :label="$tc('formCard.cardName')" 
      required
      @input="$v.valueFields.cardName.$touch()"
      @blur="$v.valueFields.cardName.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="valueFields.cardNumber"
      :error-messages="cardNumberErrors"
      :label="$tc('formCard.cardNumber')" 
         v-mask="'####-####-####-####'"
      required
      @input="$v.valueFields.cardNumber.$touch()"
      @blur="$v.valueFields.cardNumber.$touch()"
    ></v-text-field>

    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="valueFields.cardMonth"
          :error-messages="cardMonthErrors"
          :label="$tc('formCard.cardMonth')" 
          required
         
          @input="$v.valueFields.cardMonth.$touch()"
          @blur="$v.valueFields.cardMonth.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="valueFields.cardYear"
          :error-messages="cardYearErrors"
          :label="$tc('formCard.cardYear')" 
          required
          @input="$v.valueFields.cardYear.$touch()"
          @blur="$v.valueFields.cardYear.$touch()"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-text-field
      v-model="valueFields.cardCvv"
      :error-messages="cardCvvErrors"
      :label="$tc('formCard.cvv')" 
       v-mask="'####'"
      required
      @input="$v.valueFields.cardCvv.$touch()"
      @blur="$v.valueFields.cardCvv.$touch()"
    ></v-text-field>

   <v-btn
      class="mr-4"
      @click="submit"
      :disabled="!isFormValid"
      hidden
    >
      Submit
    </v-btn>
    <v-btn @click="clear" >
      <v-icon color="red">mdi-credit-card-remove</v-icon>
    </v-btn>
  </form>
   </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import products from '@/store/products'
  import VuePaycard from 'vue-paycard';
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, minLength, between, alpha } from 'vuelidate/lib/validators'
 

  export default {
    mixins: [validationMixin],
   

    validations: {
        valueFields:{
        cardName: { required,  minLength: minLength(3), maxLength: maxLength(10), alpha },
        cardNumber: { required, minLength: minLength(19), maxLength: maxLength(19) },
        cardMonth: { required, maxLength: maxLength(2), between: between(1, 12) },
        cardYear: { required, maxLength: maxLength(4), between: between(2023, 2040)},
        cardCvv: { required, minLength: minLength(3), maxLength: maxLength(4) }
        }
    },
    components: {
    VuePaycard,
  },

    data: () => ({
    }),

   computed: {

    valueFields(){
      return products.state.valueFields
    },
   isFormValid() {
  if (!this.$v.valueFields.$invalid) {
    products.commit('setUpdateForm', true)

  } else {
    console.log("error");
    products.commit('setUpdateForm', false)
    
  }
}
,
    cardNameErrors () {
    const errors = []
    if (!this.$v.valueFields.cardName.$dirty) return errors
    !this.$v.valueFields.cardName.required && errors.push(this.$tc('validationsCardText.required'))
    !this.$v.valueFields.cardName.alpha && errors.push(this.$tc('validationsCardText.cardName'))
    !this.$v.valueFields.cardName.minLength && errors.push(this.$tc('validationsCardText.cardNameMinMax'))
    !this.$v.valueFields.cardName.maxLength && errors.push(this.$tc('validationsCardText.cardNameMinMax'))
    return errors
  },
  cardNumberErrors () {
    const errors = []
    if (!this.$v.valueFields.cardNumber.$dirty) return errors
    !this.$v.valueFields.cardNumber.required && errors.push(this.$tc('validationsCardText.required'))
    !this.$v.valueFields.cardNumber.minLength && errors.push(this.$tc('validationsCardText.cardNumber'))
    !this.$v.valueFields.cardNumber.maxLength && errors.push(this.$tc('validationsCardText.cardNumber'))
    return errors
  },
  cardMonthErrors() {
    const errors = [];
    if (!this.$v.valueFields.cardMonth.$dirty) return errors;
    !this.$v.valueFields.cardMonth.required && errors.push(this.$tc('validationsCardText.required'));
    !this.$v.valueFields.cardMonth.between && errors.push(this.$tc('validationsCardText.cardMonth'));
    return errors;
  },
  cardYearErrors() {
    const errors = [];
    if (!this.$v.valueFields.cardYear.$dirty) return errors;
    !this.$v.valueFields.cardYear.required && errors.push(this.$tc('validationsCardText.required'));
    !this.$v.valueFields.cardYear.between && errors.push(this.$tc('validationsCardText.cardYear'));
    return errors;
  },
  cardCvvErrors() {
    const errors = [];
    if (!this.$v.valueFields.cardCvv.$dirty) return errors;
    !this.$v.valueFields.cardCvv.required && errors.push(this.$tc('validationsCardText.required'));
    !this.$v.valueFields.cardCvv.maxLength && errors.push(this.$tc('validationsCardText.cvv'));
    return errors;
  },
},

    
    methods:{
        submit () {
            this.$v.$touch()
       
      },
      clear () {
        this.$v.$reset()
        this.$v.$reset();
        this.valueFields.cardName = "";
        this.valueFields.cardNumber = "";
        this.valueFields.cardMonth = "";
        this.valueFields.cardYear = "";
        this.valueFields.cardCvv = "";
        products.commit('setUpdateForm', false)
      },

    }
  }
</script>

