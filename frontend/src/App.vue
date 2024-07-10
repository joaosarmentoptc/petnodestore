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
          <router-link
            v-if="isAuthenticated"
            @click="logout"
            :to="{ name: 'homePage' }"
            class="navbar-item"
            ><span>Logout</span></router-link
          >
          <router-link v-if="!isAuthenticated" to="#" class="navbar-item"
            ><span>Login</span></router-link
          >
          <router-link v-if="!isAuthenticated" :to="{ name: 'registerUser' }" class="navbar-item"
            ><span>Register</span></router-link
          >
        </div>
      </div>
    </nav>
  </header>
  <div class="section is-medium">
    <main>
      <router-view />
    </main>
  </div>
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
