<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <vue-paycard :value-fields="valueFields" />
      </v-col>
      <v-col cols="4">
     
  <form>
    <v-text-field
      v-model="valueFields.cardName"
      :error-messages="cardNameErrors"
      label="Card Name"
      required
      @input="$v.valueFields.cardName.$touch()"
      @blur="$v.valueFields.cardName.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="valueFields.cardNumber"
      :error-messages="cardNumberErrors"
      label="Card Number"
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
          label="Expiration Month"
          required
         
          @input="$v.valueFields.cardMonth.$touch()"
          @blur="$v.valueFields.cardMonth.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="valueFields.cardYear"
          :error-messages="cardYearErrors"
          label="Expiration Year"
          required
          @input="$v.valueFields.cardYear.$touch()"
          @blur="$v.valueFields.cardYear.$touch()"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-text-field
      v-model="valueFields.cardCvv"
      :error-messages="cardCvvErrors"
      label="CVV"
      required
      @input="$v.valueFields.cardCvv.$touch()"
      @blur="$v.valueFields.cardCvv.$touch()"
    ></v-text-field>

    <v-btn
      class="mr-4"
      @click="submit"
        :disabled="!isFormValid"
    >
      Submit
    </v-btn>
    <v-btn @click="clear">
      Clear
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
        cardName: { required, alpha },
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
    isFormValid () {
     return !this.$v.valueFields.$invalid
     },
  cardNameErrors () {
    const errors = []
    if (!this.$v.valueFields.cardName.$dirty) return errors
    !this.$v.valueFields.cardName.required && errors.push('Card Name is required')
    !this.$v.valueFields.cardName.alpha && errors.push('Card Name only chart')
    return errors
  },
  cardNumberErrors () {
    const errors = []
    if (!this.$v.valueFields.cardNumber.$dirty) return errors
    !this.$v.valueFields.cardNumber.required && errors.push('Card Number is required')
    !this.$v.valueFields.cardNumber.minLength && errors.push('Card Number must be 16 digits')
    !this.$v.valueFields.cardNumber.maxLength && errors.push('Card Number must be 16 digits')
    return errors
  },
  cardMonthErrors() {
    const errors = [];
    if (!this.$v.valueFields.cardMonth.$dirty) return errors;
    !this.$v.valueFields.cardMonth.required && errors.push("Month is required");
    !this.$v.valueFields.cardMonth.between && errors.push("Month must be between 1 and 12");
    return errors;
  },
  cardYearErrors() {
    const errors = [];
    if (!this.$v.valueFields.cardYear.$dirty) return errors;
    !this.$v.valueFields.cardYear.required && errors.push("Year is required");
    !this.$v.valueFields.cardYear.between && errors.push("Year must be between 2023 and 2040(yyyy)");
    return errors;
  },
  cardCvvErrors() {
    const errors = [];
    if (!this.$v.valueFields.cardCvv.$dirty) return errors;
    !this.$v.valueFields.cardCvv.required && errors.push("CVV is required");
    !this.$v.valueFields.cardCvv.maxLength && errors.push("CVV must be 3 or 4 digits");
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
      },

    }
  }
</script>

