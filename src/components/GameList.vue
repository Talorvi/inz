<template>
  <q-page>
    <div class="row">
      <div class="q-pa-sm col-xs-12 col-sm-4 col-md-3">
        <div class="row justify-center content-center" style="height: 100%">
          <div class="col-auto q-pa-xs-none q-pa-md">
            <q-btn size="lg" color="accent" round>
              <q-icon name="add" @click="$router.push('/new-scenario', () => {})"></q-icon>
            </q-btn>
          </div>
        </div>
      </div>
      <div class="q-pa-sm col-xs-12 col-sm-8 col-md-6">
        <q-card v-for="game in games" v-bind:key="game.scenario_key">
          <q-card-section class="bg-primary">
            <div class="text-h5 text-white">
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
              <q-icon name="person"></q-icon> {{ game.gameMaster }}
            </div>
            <q-space></q-space>
            <q-btn size="12px" color="accent" round class="q-mr-xs">
              <q-icon name="settings" color="white" />
            </q-btn>
            <q-btn size="12px" color="accent" round>
              <q-icon name="play_arrow" color="white" />
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
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
