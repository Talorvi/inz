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
    //this.$q.dark.set(true);
    this.$store.dispatch("refreshToken");
  }
};
</script>

<style>
body {
  overflow-y: scroll; /* Add the ability to scroll */
}

/* Hide scrollbar for Chrome, Safari and Opera */
body::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE and Edge */
body {
  -ms-overflow-style: none;
}

.q-field__marginal {
  color: inherit !important;
}
</style>
