<template>
  <q-page>
    <div class="row">
      <div class="q-pa-sm col-xs-12 col-sm-4 col-md-3">
        <div class="row justify-center" style="height: 100%">
          <div class="col-auto q-pa-xs-none q-pa-md">
            <q-btn
              style="width: 100%"
              size="lg"
              color="accent"
              @click="$router.push('/new-scenario', () => {})"
            >
              Create
            </q-btn>
            <q-btn
              style="width: 100%"
              class="q-mt-md"
              size="lg"
              color="primary"
              @click="$router.push('/join-scenario', () => {})"
            >
              Join
            </q-btn>
          </div>
        </div>
      </div>
      <div class="q-pa-sm col-xs-12 col-sm-8 col-md-6">
        <q-card
          v-for="game in games"
          v-bind:key="game.scenario_key"
          class="q-mb-md"
        >
          <q-card-section class="bg-primary">
            <div class="text-h5 text-white">
              <div v-if="game.onlinePlayers.length > 0">
                <q-badge align="middle" class="bg-transparent">
                  <q-icon name="brightness_1" color="positive" />
                  {{ game.onlinePlayers.length }}
                </q-badge>
                {{ game.name.toUpperCase() }}
              </div>
              <div v-else>
                <q-badge align="middle" class="bg-transparent">
                  <q-icon name="brightness_1" color="negative" />
                </q-badge>
                {{ game.name.toUpperCase() }}
              </div>
            </div>
          </q-card-section>
          <q-separator color="accent" />
          <q-card-actions class="q-pa-md" align="around">
            <div class="text-h6 q-pl-md">
              <div v-if="game.gameMaster === username">
                <q-icon color="accent" name="person"></q-icon>
                {{ game.gameMaster }}
              </div>
              <div v-else>
                <q-icon name="person"></q-icon>
                {{ game.gameMaster }}
              </div>
            </div>
            <q-space></q-space>
            <div v-if="game.gameMaster === username">
              <q-btn
                size="12px"
                color="accent"
                round
                class="q-mr-xs"
                @click="showScenarioKey(game)"
              >
                <q-icon name="visibility" color="white" />
              </q-btn>
            </div>
            <q-btn
              size="12px"
              color="accent"
              round
              @click="joinGame(game.scenarioKey)"
            >
              <q-icon name="play_arrow" color="white" />
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="dialog">
      <q-card>
        <q-toolbar class="q-pt-lg">
          <q-toolbar-title
            ><span class="text-h4 q-ma-md">{{
              scenarioName
            }}</span></q-toolbar-title
          >
          <q-btn flat round icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section>
          <h4 class="text-accent text-center q-ml-md q-mr-md">
            {{ scenarioKey }}
          </h4>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: "GameList",
  data() {
    return {
      dialog: false,
      scenarioKey: "",
      scenarioName: ""
    };
  },
  beforeCreate() {
    this.$store.dispatch("retrieveGameList", {
      data: this.$q
    });
  },
  methods: {
    joinGame(scenarioKey) {
      this.$router.push(/game/ + scenarioKey);
    },
    showScenarioKey(game) {
      this.scenarioKey = game.scenarioKey;
      this.scenarioName = game.name;
      this.dialog = true;
    }
  },
  computed: {
    games() {
      return this.$store.getters.getGameList;
    },
    username() {
      return this.$store.getters.getUserName;
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
