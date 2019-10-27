<template>
  <q-card class="register-form">
    <q-form @submit="onSubmit">
      <q-card-section
        style="background: radial-gradient(at bottom left, #35a2ff 0%, #014a88 100%)"
      >
        <div class="text-white text-h6">
          Sign up
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-px-lg q-pt-lg q-pb-none">
        <q-input
          class="q-pb-lg"
          filled
          v-model="email"
          label="Email"
          lazy-rules
          type="email"
          :rules="[
            val => !!val || 'Email is required',
            val => val.match(emailRegex) || 'Invalid email address'
          ]">
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>
        <q-input
          class="q-pb-lg"
          filled
          v-model="username"
          label="Username"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Enter username']">
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
        <q-input
          class="q-pb-lg"
          v-model="password1"
          filled
          type="password"
          label="Password"
          :rules="[val => (val && val.length > 0) || 'Enter password']">
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>
        <q-input
          class="q-pb-lg"
          v-model="password2"
          filled
          type="password"
          label="Password"
          :rules="[
            val => (val && val.length > 0) || 'Enter password',
            val => val === password1 || 'Passwords must be the same'
          ]">
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-section class="text-right">
        <q-btn flat>
          Already have an account? Log in
        </q-btn>
      </q-card-section>

      <q-separator />

      <q-card-actions align="center" class="q-pa-sm">
        <q-btn
          type="submit"
          flat
          size="medium"
          label="Sign up"
          color="primary"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      username: null,
      password1: null,
      password2: null,
      accept: false,
      emailRegex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    };
  },

  methods: {
    onSubmit() {
      this.$store.dispatch("register", {
        username: this.username,
        password: this.password1,
        email: this.email,
        quasar: this.$q
      });
    }
  }
};
</script>

<style scoped>
.register-form {
  max-width: 30em;
  margin: auto;
}
</style>
