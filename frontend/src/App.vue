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
  <main>
    <div class="section is-medium has-background-light">
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
    })
  },
  computed: {
    user() {
      return this.$store.getters['users/currentUser']
    },
    isAuthenticated() {
      return this.$store.getters['users/isAuthenticated']
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
</style>
