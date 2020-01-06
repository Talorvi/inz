<template>
  <div class="row" style="height: 30rem">
    <div class="col-xs-0 col-sm-4 center-image">
      <span class="helper"></span>
      <img src="~src/assets/world.svg" alt="world image" class="world-image self-center" />
    </div>
    <div class="col-xs-12 col-sm-8">
      <div class="row justify-center" style="height: 100%">
        <div class="col-auto text-center self-center">
          <q-card flat style="max-width: 30rem;">
            <q-form @submit="onSubmit">
              <q-card-section class="q-px-lg q-pt-lg q-pb-none">
                <q-input
                  filled
                  v-model="username"
                  label="Username"
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || 'Enter username',
                    val =>
                      val.length > 3 ||
                      'Username should contain more than 3 letters']"
                  class="q-pb-lg"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
                <q-input
                  v-model="password"
                  filled
                  type="password"
                  label="Password"
                  :rules="[
                    val => (val && val.length > 0) || 'Enter password',
                    val =>
                      val.length > 5 ||
                      'Password should contain more than 5 letters']"
                  class="q-pb-lg"
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                </q-input>
              </q-card-section>

              <q-card-section>
                <div>
                  <q-btn flat @click="$router.push('/register', () => {})">
                    Doesn't have an account?
                  </q-btn>
                </div>
              </q-card-section>

              <q-card-actions align="center" class="q-pa-sm">
                <q-btn
                  class="text-weight-bold"
                  type="submit"
                  flat
                  size="lg"
                  label="Log in"
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
      username: null,
      password: null,

      accept: false
    };
  },

  methods: {
    onSubmit() {
      // eslint-disable-next-line no-undef
      this.$root.$emit("noAuth");

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
.world-image {
  width: 100%;
  vertical-align: middle;
}
.center-image {
  white-space: nowrap;
  text-align: center; margin: 1em 0;
}
.helper {
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
</style>
