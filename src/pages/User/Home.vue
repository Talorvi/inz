<template>
  <GameList></GameList>
</template>

<script>
import GameList from "../../components/GameList";
export default {
  name: "Home",
  components: { GameList },
  mounted() {
    this.$store.commit("changeIsInGame", false);
  }
};
</script>
