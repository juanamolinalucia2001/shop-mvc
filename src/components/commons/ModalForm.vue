<template>
  <v-dialog v-model="showModal" max-width="800px" heigth="800" class="mt-5">
     <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Click Me
        </v-btn>
      </template>
    <v-card>
      <v-card-text>
        <v-stepper v-model="step">
            <!-- Header form multi-step  -->
          <v-stepper-header class="mt-5">
            <v-stepper-step :complete="step > 1" step="1"></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 2" step="2"></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 3" step="3"></v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
              <!-- Content step 1  -->
            <v-stepper-content step="1">
                 <h2>Datos personales</h2>
              <v-form>
                <v-text-field label="Nombre" v-model="nombre"></v-text-field>
                <v-text-field label="Apellido" v-model="apellido"></v-text-field>
                  <v-select :items="items" label="Forma de Pago"></v-select>
               
                <v-btn @click="step++">Next</v-btn>
              </v-form>
            </v-stepper-content>

            <!-- Content step 2 -->
            <v-stepper-content step="2">
                <h2>Ingresa Tarjeta</h2>
              



            <v-form>
            <v-card>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="cardNumber"
                                label="Número de tarjeta de crédito"
                                :rules="[rules.required, rules.cardNumber]"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="6">
                        <v-text-field
                            v-model="expirationMonth"
                            label="Mes de vencimiento (MM)"
                            :rules="[rules.required, rules.expirationMonth]"
                        ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="expirationYear"
                                label="Año de vencimiento (YYYY)"
                                :rules="[rules.required, rules.expirationYear]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                v-model="cvv"
                                label="CVV"
                                :rules="[rules.required, rules.cvv]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                     <v-btn @click="step--">Back</v-btn>
                <v-btn @click="step++">Next</v-btn>
              
                    </v-container>
                </v-card>
               
              </v-form>
                

                
            </v-stepper-content>

            <!-- Content step 3  -->
            <v-stepper-content step="3">
                <v-card>
                    <v-container>
                        Hola{{nombre}}{{apellido}}
                     <h2>Pago realizado con exito</h2>
                     <h3>Gracias por tu compra</h3>

                        <v-btn @click="step--">Back</v-btn>
                        <v-btn @click="submitForm">Submit</v-btn>
                    </v-container>
                </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      step: 1,
      nombre: '',
      apellido: '',
      items: ['Debito', 'Credito', 'Fizz', 'Buzz'],
      cardNumber: '5494-2700-3441-2992',
      expirationMonth: '',
      expirationYear: '',
      cvv: '',
      rules: {
        required: (value) => !!value || 'Este campo es requerido',
        cardNumber: (value) => /^([0-9]{4}-){3}[0-9]{4}$/.test(value) || 'Ingrese un número de tarjeta de crédito válido',
        expirationMonth: (value) => /^(0?[1-9]|1[0-2])$/.test(value) || 'Ingrese un mes de vencimiento válido (MM)',
        expirationYear: (value) => /^20\d{2}$/.test(value) || 'Ingrese un año de vencimiento válido (YYYY)',
        cvv: (value) => /^[0-9]{3,4}$/.test(value) || 'Ingrese un CVV válido',
      },
    }
  },
  methods: {
    submitForm() {
      this.showModal = false
    }
  }
}
</script>
