<template>
  <div class="row" style="height: 35rem">
    <div class="col-xs-0 col-sm-4 center-image">
      <span class="helper"></span>
      <img
        src="~src/assets/play.svg"
        alt="play image"
        class="play-image self-center"
      />
    </div>
    <div class="col-xs-12 col-sm-8">
      <div class="row justify-center" style="height: 100%">
        <div class="col-auto text-center self-center">
          <q-card flat style="max-width: 30rem;">
            <q-form @submit="onSubmit">
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
                  ]"
                >
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
                  :rules="[
                    val => (val && val.length > 0) || 'Enter username',
                    val =>
                      val.length > 3 ||
                      'Username should contain more than 3 letters'
                  ]"
                >
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
                  :rules="[
                    val => (val && val.length > 0) || 'Enter password',
                    val =>
                      val.length > 5 ||
                      'Password should contain more than 5 letters'
                  ]"
                >
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
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                </q-input>
              </q-card-section>

              <q-card-section>
                <div>
                  <q-btn flat @click="$router.push('/login', () => {})">
                    Already have an account? Log in
                  </q-btn>
                </div>
              </q-card-section>

              <q-card-actions align="center" class="q-pa-sm">
                <q-btn
                  class="text-weight-bold"
                  type="submit"
                  flat
                  size="lg"
                  label="Sign up"
                  color="accent"
                />
              </q-card-actions>
            </q-form>
          </q-card>
        </div>
      </div>
    </div>
  </div>
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
.play-image {
  width: 100%;
  vertical-align: middle;
}
.center-image {
  white-space: nowrap;
  text-align: center;
  margin: 1em 0;
}
.helper {
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
</style>
