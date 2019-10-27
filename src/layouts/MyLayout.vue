<template>
  <q-layout view="hHh lpr fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="title" @click="$router.push('/', () => {})">
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
            </q-avatar>
            {{ appName }}
          </div>
        </q-toolbar-title>

        <div v-if="isLoggedIn">
          <q-btn dense flat round icon="menu" @click="right = !right" />
        </div>
        <div v-else>
          <q-btn flat @click="$router.push('login', () => {})">Log in</q-btn>
          <q-btn flat @click="$router.push('register', () => {})">Sign up</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="isLoggedIn"
      v-model="right"
      side="right"
      overlay
      bordered
    >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
  import { mapActions } from 'vuex';
export default {
  name: "MyLayout",

  mounted() {
    console.log(JSON.stringify(process.env));
    this.$q.addressbarColor.set("#027BE3");
  },

  data() {
    return {
      right: false,
      appName: process.env.APP_NAME
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters.loggedIn;
    }
  },
  methods:{
    ...mapActions([
      'fetchAccessToken'
    ]),
  },
  created() {
    this.fetchAccessToken();
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

.title {
  cursor: pointer;
  display: inline-block;
}
</style>
