<template>
  <div class="box">
    <div class="container">
      <div class="content">
        <div class="columns">
          <div class="column is-half">
            <h1 class="title is-5">Select your best payment method</h1>
            <div class="field">
              <label class="radio">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="creditCard"
                  v-model="selectedPayment"
                />
                Credit Card
              </label>
            </div>
            <div class="field">
              <label class="radio">
                <input type="radio" name="paymentMethod" value="paypal" v-model="selectedPayment" />
                Paypal
              </label>
            </div>
            <div class="field">
              <label class="radio">
                <input type="radio" name="paymentMethod" value="" v-model="selectedPayment" />
                Other
              </label>
            </div>
          </div>

          <div class="column is-half">
            <table class="table is-fullwidth">
              <thead>
                <th colspan="3" class="has-text-centered">Summary</th>
              </thead>
              <tbody>
                <tr v-for="(item, index) in cartItems" :key="index">
                  <td class="is-vcentered">
                    {{ item.product.name }} - {{ item.product.price }}€ x {{ item.quantity }}qty =
                    {{ new Intl.NumberFormat('pt-PT').format(item.product.price * item.quantity) }}
                    €
                  </td>
                  <td class="has-text-right is-vcentered">
                    <figure class="image is-48x48 m-auto">
                      <img :src="item.product.image" />
                    </figure>
                  </td>
                  <td class="is-vcentered">
                    <icon
                      class="icon has-text is-clickable"
                      @click="
                        deleteItemFromCart({
                          productId: item.product.id,
                          quantity: item.quantity
                        })
                      "
                      ><i class="fas fa-trash-alt"></i
                    ></icon>
                  </td>
                </tr>
                <tr>
                  <td colspan="3" class="has-text-right">Total: {{ cartTotal() }} €</td>
                </tr>
                <tr>
                  <td colspan="3" class="has-text-right">
                    <button class="button" @click="checkout()">Checkout</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ShoppingCart',
  computed: {
    cartItems() {
      return this.$store.state.cart.cart
    }
  },
  methods: {
    ...mapActions('cart', ['deleteItemFromCart']),
    cartTotal() {
      return new Intl.NumberFormat('pt-PT').format(
        this.cartItems.reduce((total, item) => {
          return total + item.product.price * item.quantity
        }, 0)
      )
    },
    checkout() {
      if (confirm('purchase completed')) this.$router.push({ name: 'homePage' })
    }
  }
}
</script>

<style scoped></style>
