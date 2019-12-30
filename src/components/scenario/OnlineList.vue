<template>
  <!--  <q-scroll-area horizontal>-->
  <q-list>
    <q-item
      v-ripple
      v-for="player in this.$store.getters.getOnlinePlayers"
      :key="player"
    >
      <q-item-section
        avatar
        v-if="$store.getters.getOfflinePlayers.includes(player)"
      >
        <q-avatar
          size="28px"
          class="q-mb-sm q-mt-sm"
          color="grey"
          text-color="white"
        >
          {{ player[0].toUpperCase() }}
        </q-avatar>
      </q-item-section>
      <q-item-section avatar v-else>
        <q-avatar
          size="28px"
          class="q-mb-sm q-mt-sm"
          color="accent"
          text-color="white"
        >
          {{ player[0].toUpperCase() }}
        </q-avatar>
      </q-item-section>

      <q-item-section
        ><div
          v-bind:class="[
            {
              'text-weight-bold': !$store.getters.getOfflinePlayers.includes(
                player
              )
            }
          ]"
        >
          {{ player }}
        </div></q-item-section
      >

      <q-item-section
        side
        v-if="$store.getters.getUserName === $store.getters.getGameMaster"
      >
        <q-btn
          flat
          @click="removePlayerFromScenario(player)"
          :disable="
            $store.getters.getUserName === $store.getters.getGameMaster &&
              $store.getters.getUserName === player
          "
        >
          <q-icon name="delete" color="accent" />
        </q-btn>
      </q-item-section>
    </q-item>
    <q-item
      v-ripple
      v-for="player in this.$store.getters.getOfflinePlayers"
      :key="player"
    >
      <q-item-section
        avatar
        v-if="$store.getters.getOfflinePlayers.includes(player)"
      >
        <q-avatar
          size="28px"
          class="q-mb-sm q-mt-sm"
          color="grey"
          text-color="white"
        >
          {{ player[0].toUpperCase() }}
        </q-avatar>
      </q-item-section>
      <q-item-section avatar v-else>
        <q-avatar
          size="28px"
          class="q-mb-sm q-mt-sm"
          color="accent"
          text-color="white"
        >
          {{ player[0].toUpperCase() }}
        </q-avatar>
      </q-item-section>

      <q-item-section
        ><div
          v-bind:class="[
            {
              'text-weight-bold': !$store.getters.getOfflinePlayers.includes(
                player
              )
            }
          ]"
        >
          {{ player }}
        </div></q-item-section
      >

      <q-item-section
        side
        v-if="$store.getters.getUserName === $store.getters.getGameMaster"
      >
        <q-btn
          flat
          @click="removePlayerFromScenario(player)"
          :disable="
            $store.getters.getUserName === $store.getters.getGameMaster &&
              $store.getters.getUserName === player
          "
        >
          <q-icon name="delete" color="accent" />
        </q-btn>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: "OnlineList",
  methods: {
    removePlayerFromScenario(player) {
      if (
        confirm("Are you sure you want to remove this player from scenario?")
      ) {
        this.$store.dispatch("requestDeletePlayer", {
          data: this.$q,
          scenarioKey: this.$store.getters.getScenarioKey,
          name: player
        });
      }
    }
  },
  computed: {
    onlinePlayers() {
      return this.$store.getters.getOnlinePlayers;
    }
  }
};
</script>
