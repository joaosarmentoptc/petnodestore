<template>
  <header>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link :to="{ name: 'homePage' }" class="navbar-item">
          <span class="icon-text navbar-item">
            <span class="icon is-medium">
              <i class="fas fa-home"></i>
            </span>
            <span>Pet Store</span>
          </span>
        </router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <span v-if="user" class="navbar-item">Welcome, {{ user.firstname }}</span>
          <router-link v-if="isAuthenticated" class="navbar-item" :to="{ name: 'shoppingCart' }">
            <div class="icon" :class="{ 'has-badge': cart?.length }" :data-badge="cart?.length">
              <i class="fas fa-shopping-cart"></i>
            </div>
          </router-link>
          <router-link
            v-if="isAuthenticated"
            @click="logout"
            :to="{ name: 'homePage' }"
            class="navbar-item"
          >
            <span class="icon-text">
              <span class="icon is-medium">
                <i class="fas fa-sign-out-alt"></i>
              </span>
            </span>
          </router-link>
          <div class="navbar-item pr-0">
            <router-link v-if="!isAuthenticated" :to="{ name: 'loginUser' }"
              ><button class="button">Login</button></router-link
            >
          </div>
          <div class="navbar-item">
            <router-link v-if="!isAuthenticated" :to="{ name: 'registerUser' }"
              ><button class="button is-inverted">Register</button></router-link
            >
          </div>
        </div>
      </div>
    </nav>
  </header>
  <main class="has-background-light">
    <div class="section is-medium">
      <router-view />
    </div>
  </main>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted } from 'vue'

export default {
  name: 'App',
  setup() {
    const store = useStore()

    onMounted(() => {
      store.dispatch('users/getUserFromToken')
      store.dispatch('cart/getCartItems')
    })
  },
  computed: {
    user() {
      return this.$store.getters['users/currentUser']
    },
    isAuthenticated() {
      return this.$store.getters['users/isAuthenticated']
    },
    cart() {
      return this.$store.state.cart.cart
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('users/logout')
    }
  }
}
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bulma@1.0.1/css/bulma.min.css';

main {
  min-height: 100vh;
}
.has-badge {
  position: relative;
  display: inline-block;
}
.has-badge::after {
  content: attr(data-badge);
  position: absolute;
  top: -25x;
  right: 0px;
  background-color: #ff3860; /* Bulma's danger color */
  color: white;
  border-radius: 50%;
  padding: 0.2em 0.5em;
  font-size: 0.5rem;
  font-weight: bold;
}
</style>
