<template>
  <div
    class="q-pa-md q-pa-sm-none col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3"
  >
    <q-card v-for="game in games" v-bind:key="game.scenario_key">
      <q-card-section>
        <div class="text-h5">
          <div>
            <q-badge align="middle" class="bg-transparent">
              <q-icon name="brightness_1" color="red" />
            </q-badge>
            {{ game.name }} - [{{ game.gameMaster }}]
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn size="12px" color="primary" round class="q-mr-xs">
          <q-icon name="settings" />
        </q-btn>
        <q-btn size="12px" color="primary" round>
          <q-icon name="play_arrow" />
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
