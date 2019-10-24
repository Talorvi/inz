<template>
  <q-card class="login-form">
    <q-form @submit="onSubmit">
      <q-card-section
        style="background: radial-gradient(at bottom left, #35a2ff 0%, #014a88 100%)"
      >
        <div class="text-white text-h6">
          Log in
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-px-lg q-pt-lg q-pb-none">
        <q-input
          filled
          v-model="username"
          label="Username"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Enter username']"
          class="q-pb-lg">
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
        <q-input
          v-model="password"
          filled
          type="password"
          label="Password"
          :rules="[val => (val && val.length > 0) || 'Enter password']"
          class="q-pb-lg">
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-section class="text-right">
        <q-btn flat>
          Forgot password?
        </q-btn>
        <q-btn flat>
          Doesn't have an account?
        </q-btn>
      </q-card-section>

      <q-separator />

      <q-card-actions align="center" class="q-pa-sm">
        <q-btn
          type="submit"
          flat
          size="medium"
          label="Log in"
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
      username: null,
      password: null,

      accept: false
    };
  },

  methods: {
    onSubmit() {
      this.$store.dispatch("retrieveToken", {
        username: this.username,
        password: this.password,
        quasar: this.$q
      });
    }
  }
};
</script>

<style scoped>
.login-form {
  max-width: 30em;
  margin: auto;
}
</style>
