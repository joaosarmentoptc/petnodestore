<template>
  <div class="content">
    <p class="title">Dogs</p>
    <p>
      In this category, you will find everything you need for your best friend: high-quality and
      varied items capable of providing your dog with a long, healthy, and happy life. You will find
      everything from food, toys, hygiene products, and all other essential items for their daily
      needs.
    </p>
  </div>
  <div class="content">
    <div class="grid">
      <div v-for="product in catalog" :key="product.id">
        <div class="cell">
          <div class="card">
            <div class="card-image">
              <figure class="image is-128x128 m-auto">
                <img :src="product.image" />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-5">{{ product.name }}</p>
                  <p class="subtitle is-7">{{ product.brand }}</p>
                  <div class="is-flex is-justify-content-flex-end">{{ product.price }} €/kg</div>
                </div>
              </div>

              <div class="field has-addons has-addons-right">
                <div class="control">
                  <span class="select" type="text" placeholder="Find a repository">
                    <select>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                    </select>
                  </span>
                </div>
                <div class="control">
                  <button class="button is-info">
                    <div class="icon"><i class="fas fa-cart-plus"></i></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted } from 'vue'

export default {
  name: 'HomePage',
  setup() {
    const store = useStore()

    onMounted(() => {
      store.dispatch('users/getUserFromToken')
      store.dispatch('catalog/getProductList')
    })
  },
  computed: {
    catalog() {
      return this.$store.state.catalog.catalog
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  max-width: 800px;
  margin: auto;
}
.grid {
  max-width: 600px;
  margin: auto;
  margin-top: 100px;
}
</style>
