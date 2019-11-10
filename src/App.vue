<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.$root.$on("noAuth", msg => this.tryToRefreshToken(msg));
  },
  methods: {
    tryToRefreshToken(msg) {
      console.log(msg);
      // alert('a');
    }
  }
};
</script>
