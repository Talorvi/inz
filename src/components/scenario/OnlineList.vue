<template>
  <!--  <q-scroll-area horizontal>-->
  <q-list>
    <q-item
      v-ripple
      v-for="player in this.$store.getters.getOnlinePlayers"
      :key="player"
    >
      <q-item-section avatar>
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
        ><div class="text-weight-bold">
          {{ player }}
        </div></q-item-section
      >
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: "OnlineList",
  created() {
    console.log("Online players: " + this.onlinePlayers);
  },
  computed: {
    onlinePlayers() {
      return this.$store.getters.getOnlinePlayers;
    }
  }
};
</script>
