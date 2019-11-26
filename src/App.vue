<template>
  <div id="q-app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  beforeCreate() {
    //this.$root.$on("noAuth", msg => this.tryToRefreshToken(msg));
    this.$q.dark.set(true);
    this.$store.dispatch("refreshToken");
  }
};
</script>
