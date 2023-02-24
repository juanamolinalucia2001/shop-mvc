<template>
  <v-snackbar :color="color" v-model="show" >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="show = false">
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  props: {
    show: Boolean,
    text: String,
    color: String,
  },
  data() {
    return {
      //
    };
  },
};
</script>