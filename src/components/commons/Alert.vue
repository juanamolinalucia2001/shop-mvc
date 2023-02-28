<template>
  <v-snackbar :color="color" v-model="show" :timeout="1000" >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="show = false">
        Close
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

    };
  },
};
</script>