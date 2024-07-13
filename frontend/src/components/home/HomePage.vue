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
    <div class="grid mb-6">
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
                  <input
                    class="input"
                    type="number"
                    placeholder="Qty"
                    value="1"
                    :ref="'qty' + product.id"
                  />
                </div>
                <div class="control">
                  <button
                    class="button is-info"
                    @click="addToCart(product.id, $refs['qty' + product.id][0].value)"
                  >
                    <div class="icon"><i class="fas fa-cart-plus"></i></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <nav class="pagination is-rounded is-centered" role="navigation" aria-label="pagination">
        <ul class="pagination-list">
          <li v-if="hasPrevious">
            <a @click="previousPage()" class="pagination-link" aria-label="Goto previous page"
              >Previous</a
            >
          </li>
          <li v-if="hasPrevious"><span class="pagination-ellipsis">&hellip;</span></li>
          <li v-if="hasPrevious || hasNext">
            <a class="pagination-link is-current" aria-label="Current Page" aria-current="page">{{
              currentPage
            }}</a>
          </li>
          <li v-if="hasNext"><span class="pagination-ellipsis">&hellip;</span></li>
          <li v-if="hasNext">
            <a @click="nextPage()" class="pagination-link" aria-label="Goto next page">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapActions, useStore } from 'vuex'
import { onMounted } from 'vue'

const PAGINATION_LIMIT = Number(import.meta.env.VITE_PAGINATION_LIMIT)

export default {
  name: 'HomePage',
  data() {
    return {
      currentOffset: 0
    }
  },
  setup() {
    const store = useStore()

    onMounted(() => {
      store.dispatch('users/getUserFromToken')
      store.dispatch('catalog/getProductList')
    })
  },
  methods: {
    ...mapActions('catalog', ['getProductList']),
    ...mapActions('cart', ['addItemToCart']),
    nextPage() {
      this.currentOffset += PAGINATION_LIMIT
      this.getProductList(this.currentOffset)
    },
    previousPage() {
      this.currentOffset -= PAGINATION_LIMIT
      this.getProductList(this.currentOffset)
    },

    addToCart(productId, quantity) {
      if (!this.$store.state.users.isAuthenticated) this.$router.push({ name: 'loginUser' })

      this.addItemToCart({ productId, quantity })
    }
  },
  computed: {
    catalog() {
      return this.$store.state.catalog.catalog
    },
    hasPrevious() {
      return !!this.$store.state.catalog.previousPage
    },
    hasNext() {
      return !!this.$store.state.catalog.nextPage
    },
    currentPage() {
      return this.currentOffset / PAGINATION_LIMIT + 1
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
