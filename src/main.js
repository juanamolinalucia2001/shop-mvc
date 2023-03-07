import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import VueMask from 'v-mask'
Vue.use(VueMask);
import i18n from '@/plugins/i18n'
import { auth } from "./firebase";


auth.onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
    const detectedUser = {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      photosrc: user.photoURL,
      provider: user.providerData[0].providerId
    };
    store.dispatch("detectUser", detectedUser);
  } else {
    store.dispatch("detectUser", user);
  }
})

Vue.config.productionTip = false

import VuePaycard from "vue-paycard";

Vue.use(VuePaycard);

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
