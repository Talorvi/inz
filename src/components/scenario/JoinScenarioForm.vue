<template>
  <q-page>
    <div class="row bg-secondary justify-center">
      <div class="col-xs-12 col-sm-8">
        <h4 class="text-accent q-pl-lg text-weight-bold text-uppercase">
          Join Scenario
        </h4>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-8 offset-xs-0 offset-sm-2">
        <div class="row justify-center q-pt-md" style="height: 20rem">
          <div class="col-xs-0 col-sm-4 center-image">
            <span class="helper"></span>
            <img
              src="~src/assets/search.svg"
              alt="search image"
              class="search-image self-center"
            />
          </div>
          <div class="col-xs-12 col-sm-8 self-center">
            <div class="row justify-center" style="height: 100%;">
              <div class="col-auto text-center self-center" style="width: 100%">
                <q-card
                  flat
                  style="max-width: 30rem; margin-left: auto; margin-right: auto;"
                  class="q-pt-lg"
                >
                  <q-form @submit="onSubmit">
                    <q-card-section class="q-px-lg q-pt-lg q-pb-none">
                      <q-input
                        filled
                        v-model="scenarioKey"
                        label="Scenario Key"
                        fill-mask
                        class="q-pb-lg"
                        mask="XXXXXXXX"
                      >
                        <template v-slot:prepend>
                          <q-icon name="vpn_key" />
                        </template>
                      </q-input>
                      <q-input
                        v-model="password"
                        filled
                        type="password"
                        label="Password"
                      >
                        <template v-slot:prepend>
                          <q-icon name="lock" />
                        </template>
                      </q-input>
                    </q-card-section>
                    <q-card-actions align="center" class="q-pa-sm">
                      <q-btn
                        class="text-weight-bold"
                        type="submit"
                        flat
                        size="lg"
                        label="Join"
                        color="accent"
                      />
                    </q-card-actions>
                  </q-form>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "JoinScenarioForm",
  data() {
    return {
      scenarioKey: null,
      password: null
    };
  },
  methods: {
    onSubmit() {
      console.log("sent");
      // eslint-disable-next-line no-undef
      // this.$root.$emit("noAuth");

      this.$store.dispatch("joinScenario", {
        scenarioKey: this.scenarioKey,
        password: this.password,
        quasar: this.$q,
        router: this.$router
      });
    }
  }
};
</script>

<style scoped>
.search-image {
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
