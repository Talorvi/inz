<template>
  <div>
    <div class="row bg-secondary justify-center">
      <div class="col-xs-12 col-sm-8">
        <h4 class="text-accent q-pl-lg text-weight-bold text-uppercase">
          Roll
        </h4>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-8 offset-xs-0 offset-sm-2">
        <div class="row justify-center q-pt-md">
          <div class="col-xs-0 col-sm-4 center-image" style="height: 20rem">
            <div class="row justify-center fit">
              <div class="col-6">
                <span class="helper"></span>
                <img
                  src="~src/assets/roll.svg"
                  alt="completed"
                  class="completed-image self-center"
                />
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-8 self-center">
            <div class="row justify-center">
              <div class="col-auto text-center q-pa-xs-md q-pa-sm-md">
                <q-card
                  flat
                  style="max-width: 30rem; margin-left: auto; margin-right: auto;"
                  class="q-pt-lg q-pb-lg"
                >
                  <q-form @submit="onSubmit">
                    <q-card-section class="q-px-lg q-pt-lg q-pb-none">
                      <q-input
                        v-model.number="dices"
                        type="number"
                        filled
                        label="Number of dices"
                        class="q-pb-md"
                      />
                      <q-input
                        v-model.number="sides"
                        type="number"
                        filled
                        label="Number of dice sides"
                      />
                    </q-card-section>
                    <q-card-actions align="center" class="q-pa-sm">
                      <q-btn
                        class="text-weight-bold"
                        type="submit"
                        flat
                        size="lg"
                        label="Roll"
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
  </div>
</template>

<script>
export default {
  name: "RollView",
  data() {
    return {
      dices: 1,
      sides: 20
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("rollDice", {
        characterName: this.$store.getters.getSelectedCharacter,
        dices: this.dices,
        sides: this.sides,
        scenarioKey: this.$store.getters.getScenarioKey
      });
    }
  }
};
</script>

<style scoped>
.completed-image {
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
