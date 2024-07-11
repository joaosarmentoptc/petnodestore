<template>
  <div class="box">
    <div class="container">
      <div class="content">
        <h1>Login</h1>
        <form @submit.prevent="submit">
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left">
              <input class="input" type="email" v-model="email" placeholder="Email" required />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>

            <div class="control has-icons-left">
              <input
                class="input"
                type="password"
                v-model="password"
                placeholder="Password"
                required
              />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </div>
          </div>
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button class="button is-primary" type="submit">Login</button>
            </p>
          </div>

          <!-- Error message -->
          <p v-if="error" class="notification is-danger">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginUser',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    ...mapActions('users', ['login']),

    async submit() {
      const loginData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.login(loginData)
        this.$router.push('/') // Redirect to home page
        this.clearForm()
      } catch (err) {
        this.error = err
      }
    }
  }
}
</script>

<style scoped>
.box {
  max-width: 500px;
  margin: auto;
}
</style>
