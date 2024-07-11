<template>
  <div class="content"></div>
  <div v-for="product in catalog" :key="product.id">
    {{ product }}
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  computed: {
    catalog() {
      return this.$store.state.catalog.catalog
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
