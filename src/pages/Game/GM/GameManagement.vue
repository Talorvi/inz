<template>
  <q-page>
    <div class="row bg-secondary justify-center">
      <div class="col-xs-12 col-sm-8">
        <h4 class="text-accent q-pl-lg text-weight-bold text-uppercase">
          Game Management
        </h4>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-12">
        <q-splitter disable>
          <template v-slot:before>
            <q-tabs
              v-model="tabGM"
              dense
              class="text-grey q-pt-md"
              active-color="accent"
              indicator-color="accent"
              align="justify"
              vertical
            >
              <q-tab
                name="abilities"
                icon="fas fa-book"
                label="Abilities"
                @click="goToAbilities"
              />
              <q-tab
                name="equipment"
                icon="fas fa-box"
                label="Equipment"
                @click="goToEquipment"
              />
              <q-tab
                name="magic"
                icon="fas fa-hat-wizard"
                label="Magic"
                @click="goToMagic"
              />
              <q-tab
                name="players"
                icon="fas fa-user"
                label="Players"
                @click="goToPlayers"
              />
              <q-tab
                name="scenario"
                icon="fas fa-book-open"
                label="Scenario"
                @click="goToScenario"
              />
            </q-tabs>
          </template>

          <template v-slot:after>
            <router-view />
          </template>
        </q-splitter>
      </div>
    </div>
  </q-page>
</template>

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

<script>
export default {
  name: "GameManagement",
  data() {
    return {
      tabGM: "abilities",
      tabAbilities: "features",
      splitterModel: 25
    };
  },
  methods: {
    goToAbilities() {
      this.$router.push(
        "/game/" +
          this.$route.params.scenarioKey +
          "/gameManagement/abilities/features",
        () => {}
      );
    },
    goToEquipment() {
      this.$router.push(
        "/game/" +
          this.$route.params.scenarioKey +
          "/gameManagement/equipment/weapons",
        () => {}
      );
    },
    goToMagic() {
      this.$router.push(
        "/game/" +
          this.$route.params.scenarioKey +
          "/gameManagement/magic/spells",
        () => {}
      );
    },
    goToPlayers() {
      this.$router.push(
        "/game/" + this.$route.params.scenarioKey + "/gameManagement/players",
        () => {}
      );
    },
    goToScenario() {
      this.$router.push(
        "/game/" + this.$route.params.scenarioKey + "/gameManagement/scenario",
        () => {}
      );
    }
  }
};
</script>
