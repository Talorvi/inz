<template>
  <div class="row">
    <div class="col-12">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="accent"
        indicator-color="accent"
        align="justify"
        narrow-indicator
      >
        <q-tab
          name="features"
          icon="fas fa-khanda"
          label="Features"
          @click="goToFeatures"
        />
        <q-tab
          name="languages"
          icon="fas fa-shield-alt"
          label="Languages"
          @click="goToLanguages"
        />
        <q-tab
          name="traits"
          icon="fas fa-cog"
          label="Traits"
          @click="goToTraits"
        />
        <q-tab
          name="proficiencies"
          icon="fas fa-hammer"
          label="Proficiencies"
          @click="goToProficiencies"
        />
      </q-tabs>
      <q-separator></q-separator>
      <div class="q-pa-lg">
        <div class="row">
          <div
            class="col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-6 offset-xs-0 offset-sm-0 offset-md-2 offset-lg-3 offset-xl-3"
          >
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
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
  name: "JoinSuccess",
  data() {
    return {
      tab: "features"
    };
  },
  methods: {
    goToFeatures() {
      this.$router.push(
        "/game/" +
          this.$route.params.scenarioKey +
          "/gameManagement/abilities/features",
        () => {}
      );
    },
    goToLanguages() {
      this.$router.push(
        "/game/" +
          this.$route.params.scenarioKey +
          "/gameManagement/abilities/languages",
        () => {}
      );
    },
    goToTraits() {
      this.$router.push(
        "/game/" +
          this.$route.params.scenarioKey +
          "/gameManagement/abilities/traits",
        () => {}
      );
    },
    goToProficiencies() {
      this.$router.push(
        "/game/" +
          this.$route.params.scenarioKey +
          "/gameManagement/abilities/proficiencies",
        () => {}
      );
    }
  }
};
</script>
