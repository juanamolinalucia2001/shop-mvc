<template>
  <div class="mt-2">
    <h2>Cart</h2>
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