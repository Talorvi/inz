<template>
  <q-page>
    <div>

    </div>
<!--    <div class="row fit">-->
<!--      <div class="col-xs-12 col-sm-8 offset-xs-0 offset-sm-2">-->
<!--    <div class="row">-->
<!--    </div>-->
<!--      </div>-->
<!--    </div>-->
  </q-page>
</template>

<script>
export default {
  name: "Lobby",
  beforeCreate() {
    this.$store.dispatch("connectToScenario", this.$route.params.scenarioKey);
  },
  beforeDestroy() {
    this.$store.commit("changeIsInGame", false);
  }
};
</script>
