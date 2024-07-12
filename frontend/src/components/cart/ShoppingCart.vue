<template>
  {{ cartItems }}
</template>

<script>
export default {
  name: 'ShoppingCart',
  computed: {
    cartItems() {
      return this.$store.state.cart.cart
    }
  }
}
</script>

<style scoped></style>
