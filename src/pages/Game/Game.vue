<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-xs-12">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </q-page>
</template>

<script>
//import OnlineList from "../../components/scenario/OnlineList";
export default {
  name: "Lobby",
  //components: { OnlineList },
  beforeCreate() {
    this.$store.dispatch("connectToScenario", this.$route.params.scenarioKey);
  },
  beforeDestroy() {
    this.$store.commit("changeIsInGame", false);
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.25s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
