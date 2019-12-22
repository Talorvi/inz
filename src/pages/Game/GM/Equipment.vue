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
          name="weapons"
          icon="fas fa-khanda"
          label="Weapons"
          @click="goToWeapons"
        />
        <q-tab
          name="armors"
          icon="fas fa-shield-alt"
          label="Armors"
          @click="goToArmors"
        />
        <q-tab name="gears" icon="fas fa-cog" label="Gear" @click="goToGears" />
        <q-tab
          name="tools"
          icon="fas fa-hammer"
          label="Tools"
          @click="goToTools"
        />
        <q-tab
          name="vehicles"
          icon="fas fa-horse"
          label="Vehicles"
          @click="goToVehicles"
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
  name: "Equipment",
  data() {
    return {
      tab: "weapons"
    };
  },
  methods: {
    goToWeapons() {
      this.$router.push(
        "/game/" +
          this.$route.params.scenarioKey +
          "/gameManagement/equipment/weapons",
        () => {}
      );
    },
    goToArmors() {
      this.$router.push(
        "/game/" +
          this.$route.params.scenarioKey +
          "/gameManagement/equipment/armors",
        () => {}
      );
    },
    goToGears() {
      this.$router.push(
        "/game/" +
          this.$route.params.scenarioKey +
          "/gameManagement/equipment/gear",
        () => {}
      );
    },
    goToTools() {
      this.$router.push(
        "/game/" +
          this.$route.params.scenarioKey +
          "/gameManagement/equipment/tools",
        () => {}
      );
    },
    goToVehicles() {
      this.$router.push(
        "/game/" +
          this.$route.params.scenarioKey +
          "/gameManagement/equipment/vehicles",
        () => {}
      );
    }
  }
};
</script>
