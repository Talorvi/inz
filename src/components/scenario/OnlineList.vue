<template>
  <div>
    <h4>Players online:</h4>
    <ul>
      <li v-for="player in onlinePlayers" v-bind:key="player.name">{{ player.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "OnlineList",
  beforeCreate() {
    this.$store.dispatch("retrieveOnlinePlayers", {
      data: this.$q
    });
  },

  computed: {
    onlinePlayers() {
      return this.$store.getters.getOnlinePlayers;
    }
  }
};
</script>
