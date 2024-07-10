<template>
  <div class="content">
    <h1 v-if="user ">{{ `Hello, ${user.firstname} ${user.lastname}!` }}!</h1>
    <h1 v-else>Hello, guest!</h1>

    <p>{{ user }}</p>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  computed: {
    user() {
      return this.$store.getters['users/currentUser']
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
