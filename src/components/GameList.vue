<template>
  <div
    class="q-pa-sm col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3"
  >
    <q-card v-for="game in games" v-bind:key="game.scenario_key">
      <q-card-section class="bg-primary">
        <div class="text-h5 text-secondary">
          <q-badge align="middle" class="bg-transparent">
            <q-icon name="brightness_1" color="positive" />
            5
          </q-badge>
          {{ game.name.toUpperCase() }}
        </div>
      </q-card-section>
      <q-separator color="accent" />
      <q-card-actions class="q-pa-md" align="around">
        <div class="text-h6 q-pl-md">
          {{ game.gameMaster }}
        </div>
        <q-space></q-space>
        <q-btn size="12px" color="accent" round class="q-mr-xs">
          <q-icon name="settings" color="secondary" />
        </q-btn>
        <q-btn size="12px" color="accent" round>
          <q-icon name="play_arrow" color="secondary" />
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "GameList",
  beforeCreate() {
    this.$store.dispatch("retrieveGameList", {
      data: this.$q
    });
  },
  methods: {
    joinGame() {}
  },
  computed: {
    games() {
      return this.$store.getters.getGameList;
    }
  }
};
</script>

<style scoped>
.name-wrapper {
  cursor: pointer;
  display: inline-block;
}
.title {
  width: 75%;
  display: inline-block;
}
.settings {
  width: 25%;
  display: inline-block;
}
</style>
