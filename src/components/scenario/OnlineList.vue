<template>
  <div>
    <h4>Players online:</h4>
    <q-btn class="q-mx-xs" v-for="player in this.$store.getters.getOnlinePlayers" :key="player">
      <div>
        <q-avatar
          size="56px"
          class="q-mb-sm q-mt-sm"
          color="accent"
          text-color="white"
        >
          {{ player[0].toUpperCase() }}
        </q-avatar>
        <div class="text-weight-bold text-center">{{ player }}</div>
      </div>

    </q-btn>
  </div>
</template>

<script>
export default {
  name: "OnlineList",
  mounted(){
    console.log("Online players: " + this.$store.getters.getOnlinePlayers.length);
  }
};

</script>
