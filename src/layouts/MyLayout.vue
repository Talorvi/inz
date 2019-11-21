<template>
  <q-layout view="hHh lpr fFf">
    <q-header reveal elevated class="bg-primary text-white q-pt-md">
      <q-toolbar inset>
        <q-toolbar-title class="title" @click="$router.push('/', () => {})">
          WAS <strong>RPG</strong>
        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar>
        <q-space></q-space>
        <div v-if="isLoggedIn">
          <q-btn dense flat round icon="menu" @click="right = !right" />
        </div>
        <div v-else>
          <q-btn flat @click="$router.push('login', () => {})">Log in</q-btn>
          <q-btn flat @click="$router.push('register', () => {})"
            >Sign up</q-btn
          >
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-if="isLoggedIn" v-model="right" side="right" elevated>
      <!-- drawer content -->
      <q-img
        class="bg-secondary"
        style="height: 150px"
      >
        <div class="absolute-top-right bg-transparent">
          <q-btn round color="primary" @click="logout">
            <q-icon size="sm" name="logout"></q-icon>
          </q-btn>
        </div>
        <div class="absolute-center bg-transparent" @click="goToProfile">
          <q-btn class="cursor-pointer">
            <q-avatar
              size="56px"
              class="q-mb-sm"
              color="accent"
              text-color="white"
            >
              {{ getUserName[0].toUpperCase() }}
            </q-avatar>
            <div class="text-weight-bold text-center">{{ getUserName }}</div>
          </q-btn>
        </div>
      </q-img>

      <q-list>
        <q-item clickable v-ripple @click="logout()">
          <q-item-section avatar>
            <q-icon color="primary" name="logout" />
          </q-item-section>
          <q-item-section>Logout</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="person" />
          </q-item-section>
          <q-item-section>Account</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="list" />
          </q-item-section>
          <q-item-section>Games</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from "vuex";
import VueCookies from "vue-cookies";

export default {
  name: "MyLayout",

  mounted() {
    //this.$q.addressbarColor.set("#027BE3");
  },

  data() {
    return {
      right: true,
      appName: process.env.APP_NAME
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters.loggedIn;
    },
    getUserName() {
      return VueCookies.get("username");
    }
  },
  methods: {
    ...mapActions(["fetchAccessToken"]),
    logout() {
      this.$store.dispatch("logout", {});
    },
    goToProfile() {
      this.$router.push("profile", () => {});
    }
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

.header {
  font-size: 2em;
}

.title {
  cursor: pointer;
  display: inline-block;
  font-size: 2rem;
  size: auto;
}
</style>
