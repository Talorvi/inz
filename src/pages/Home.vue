<template>
  <q-page>
    <div class="row q-pt-lg">
      <GameList></GameList>
    </div>
  </q-page>
</template>

<script>
import GameList from "../components/GameList";
export default {
  name: "Home",
  components: { GameList }
};
</script>
