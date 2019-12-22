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
          name="spells"
          icon="fas fa-scroll"
          label="Spells"
          @click="goToSpells"
        />
        <q-tab
          name="schools"
          icon="fas fa-school"
          label="Magic Schools"
          @click="goToSchools"
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
      tab: "spells"
    };
  },
  methods: {
    goToSpells() {
      this.$router.push(
        "/game/" +
          this.$route.params.scenarioKey +
          "/gameManagement/magic/spells",
        () => {}
      );
    },
    goToSchools() {
      this.$router.push(
        "/game/" +
          this.$route.params.scenarioKey +
          "/gameManagement/magic/magic-schools",
        () => {}
      );
    }
  }
};
</script>
