<template>
  <q-card class="login-form">
    <q-card-section
      style="background: radial-gradient(at bottom left, #35a2ff 0%, #014a88 100%)"
    >
      <div class="text-white text-h6">
        Log in
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="username"
          label="Username"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Enter username']"
        />
        <q-input
          v-model="password"
          filled type="password"
          label="Password"
          :rules="[val => (val && val.length > 0) || 'Enter password']"
        />
      </q-form>
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
      <q-btn flat size="medium" label="Log in" color="primary" @click="login" />
    </q-card-actions>
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
    login() {
      // this.$q.notify({
      //   color: "green-5",
      //   textColor: "white",
      //   icon: "done",
      //   message: "Success"
      // });
      //this.$router.push("/");
      this.$store.dispatch("retrieveToken", {
        username: this.username,
        password: this.password,
        quasar: this.$q
      });
    },
    onSubmit() {
      // if (this.accept !== true) {
      //   this.$q.notify({
      //     color: 'red-5',
      //     textColor: 'white',
      //     icon: 'warning',
      //     message: 'You need to accept the license and terms first'
      //   })
      // }
      // else {
      //   this.$q.notify({
      //     color: 'green-4',
      //     textColor: 'white',
      //     icon: 'cloud_done',
      //     message: 'Submitted'
      //   })
      // }
      this.$q.notify({
        color: "green-3",
        textColor: "white",
        icon: "warning",
        message: "Success"
      });
      //this.$store.dispatch('requestToken');

      this.$store.dispatch("retrieveToken", {
        username: this.username,
        password: this.password
      });
    },
    onReset() {}
  }
};
</script>

<style scoped>
.login-form {
  max-width: 30em;
  margin: auto;
}
</style>
