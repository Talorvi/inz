<template>
  <q-page>
    <div class="row bg-secondary justify-center">
      <div class="col-xs-12 col-sm-8">
        <h4 class="text-accent q-pl-lg text-weight-bold text-uppercase">
          New Scenario
        </h4>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-8 offset-xs-0 offset-sm-2">
        <div class="row justify-center q-pt-md">
          <div class="col-xs-0 col-sm-4 center-image" style="height: 20rem">
            <span class="helper"></span>
            <img
              src="~src/assets/pizzashare.svg"
              alt="pizza image"
              class="pizza-image self-center"
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
                    <q-card-section>
                      <q-input
                        v-model="name"
                        filled
                        label="Scenario name"
                        :rules="[
                          val =>
                            (val && val.length > 0) || 'Enter scenario name',
                          val =>
                            val.length > 3 ||
                            'The name should contain more than 3 letters'
                        ]"
                        class="q-pb-lg"
                      >
                        <template v-slot:prepend>
                          <q-icon name="text_format" />
                        </template>
                      </q-input>
                      <q-input
                        v-model="password"
                        filled
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
<!--                      <q-input-->
<!--                        v-model.number="maxPlayers"-->
<!--                        type="number"-->
<!--                        label="Max Players"-->
<!--                        filled-->
<!--                        :rules="[val => val > 0 || 'Enter valid player number']"-->
<!--                      >-->
<!--                        <template v-slot:prepend>-->
<!--                          <q-icon name="people" />-->
<!--                        </template>-->
<!--                      </q-input>-->
                    </q-card-section>
                    <q-card-actions align="center">
                      <q-btn
                        class="text-weight-bold"
                        type="submit"
                        flat
                        size="lg"
                        label="Create"
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
  name: "NewScenarioForm",
  data() {
    return {
      name: null,
      password: null,
      maxPlayers: 5
    };
  },
  methods: {
    onSubmit() {
      console.log("sent");
      // eslint-disable-next-line no-undef
      // this.$root.$emit("noAuth");

      this.$store.dispatch("addNewScenario", {
        name: this.name,
        password: this.password,
        quasar: this.$q,
        router: this.$router
      });
    }
  }
};
</script>

<style scoped>
.pizza-image {
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
