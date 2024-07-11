<template>
  <div class="box">
    <div class="container">
      <div class="content">
        <h1>New Registration</h1>
        <form @submit.prevent="submit">
          <!-- Name fields in a row -->
          <div class="field">
            <label class="label">Name</label>
            <div class="columns">
              <div class="column">
                <div class="control has-icons-left">
                  <input
                    class="input"
                    type="text"
                    v-model="firstName"
                    placeholder="First Name"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
              </div>
              <div class="column">
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    v-model="lastName"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Email field -->
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left">
              <input class="input" type="email" v-model="email" placeholder="Email" required />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>

          <!-- Password fields in a row -->
          <div class="field">
            <label class="label">Password</label>
            <div class="columns">
              <div class="column">
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
              <div class="column">
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    v-model="confirmPassword"
                    placeholder="Confirm Password"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Buttons aligned to the right -->
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button class="button is-light" type="button" @click="clearForm">Cancel</button>
            </p>
            <p class="control">
              <button class="button is-primary" type="submit">Register</button>
            </p>
          </div>

          <!-- Error message -->
          <div v-if="error" class="notification is-danger is-light">
            {{ error }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RegisterUser',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: ''
    }
  },
  methods: {
    ...mapActions('users', ['register']),

    clearForm() {
      // Clear the form fields
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
      this.error = ''
    },

    async submit() {
      if (this.password !== this.confirmPassword) {
        this.error = 'Passwords do not match'
        return
      }

      const user = {
        firstname: this.firstName,
        lastname: this.lastName,
        email: this.email,
        password: this.password
      }

      try {
        await this.register(user)
        console.log('User registered:', user)
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
  max-width: 800px;
  margin: auto;
}
</style>
