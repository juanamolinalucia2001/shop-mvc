<template>
  <v-snackbar v-model="alerta" :color="color"  timeout="1000" >
    {{ text }}

  </v-snackbar>
</template>
<script>
export default {
  props: {
    alert:Boolean,
    text: String,
    color: String,
  },
  data() {
    return {

    };
  },
  computed:{
    alerta:{
            get(){
                return this.alert
            },
            set(newValue){
              console.log(newValue)
               return newValue
               
            }
        }
  }
};
</script>