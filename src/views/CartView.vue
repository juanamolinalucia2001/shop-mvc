<template>
  <div class="mt-2">
    <h1 class="mt-5 text-center">{{$tc('cart.title')}}</h1>
      <Cart></Cart>
  </div>
</template>
<script>
import Cart from '@/components/Cart.vue'



  export default {
    name: 'CartView',

    components: {
      Cart,
    },
  }
</script>