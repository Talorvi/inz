<template>
  <q-layout view="lHh lpr fFf">
    <q-header reveal elevated class="bg-primary text-white q-pt-md">
      <q-toolbar inset>
        <q-icon
          name="keyboard_arrow_left"
          size="lg"
          @click="$router.go(-1)"
        ></q-icon>

        <q-toolbar-title class="title" @click="$router.push('/', () => {})">
          WAS <strong>RPG</strong>
        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar>
        <div v-if="isInGame">
          <div v-if="unreadMessages > 0">
            <q-btn
              dense
              flat
              round
              icon="fas fa-comments"
              @click="toggleChatOpen"
              color="accent"
            />
            <q-badge align="middle" class="bg-transparent">
              {{ unreadMessages }}
            </q-badge>
          </div>

          <div v-else>
            <q-btn
              dense
              flat
              round
              icon="fas fa-comments"
              @click="toggleChatOpen"
            />
          </div>
        </div>
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

    <q-drawer
      v-if="isInGame"
      v-model="chatOpen"
      side="left"
      elevated
      ref="drawer"
    >
      <chatForm></chatForm>
    </q-drawer>

    <q-drawer v-if="isLoggedIn" v-model="right" side="right" elevated>
      <!-- drawer content -->
      <q-img class="bg-secondary" style="height: 150px">
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
              {{ $store.getters.getUserName[0].toUpperCase() }}
            </q-avatar>
            <div class="text-weight-bold text-center">
              {{ $store.getters.getUserName }}
            </div>
          </q-btn>
        </div>
      </q-img>

      <q-list>
        <q-item clickable v-ripple @click="logout()">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>Logout</q-item-section>
        </q-item>
        <div v-if="isInGame">
          <q-separator />
          <q-item
            clickable
            v-ripple
            @click="
              $router.push(
                '/game/' + $route.params.scenarioKey + '/roll',
                () => {}
              )
            "
          >
            <q-item-section avatar>
              <q-icon name="fas fa-dice-d20" />
            </q-item-section>
            <q-item-section>Roll</q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            @click="
              $router.push(
                '/game/' + $route.params.scenarioKey + '/statistics',
                () => {}
              )
            "
          >
            <q-item-section avatar>
              <q-icon name="fas fa-scroll" />
            </q-item-section>
            <q-item-section>Statistics</q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            @click="
              $router.push(
                '/game/' + $route.params.scenarioKey + '/abilities',
                () => {}
              )
            "
          >
            <q-item-section avatar>
              <q-icon name="fas fa-book" />
            </q-item-section>
            <q-item-section>Abilities</q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            @click="
              $router.push(
                '/game/' + $route.params.scenarioKey + '/equipment',
                () => {}
              )
            "
          >
            <q-item-section avatar>
              <q-icon name="fas fa-box" />
            </q-item-section>
            <q-item-section>Equipment</q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            @click="
              $router.push(
                '/game/' + $route.params.scenarioKey + '/spells',
                () => {}
              )
            "
          >
            <q-item-section avatar>
              <q-icon name="fas fa-hat-wizard" />
            </q-item-section>
            <q-item-section>Magic</q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            @click="
              $router.push(
                '/game/' + $route.params.scenarioKey + '/notes',
                () => {}
              )
            "
          >
            <q-item-section avatar>
              <q-icon name="fas fa-clipboard" />
            </q-item-section>
            <q-item-section>Notes</q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            @click="
              $router.push(
                '/game/' + $route.params.scenarioKey + '/characters',
                () => {}
              )
            "
          >
            <q-item-section avatar>
              <q-icon name="fas fa-users" />
            </q-item-section>
            <q-item-section>Characters</q-item-section>
          </q-item>
          <q-separator />
          <q-expansion-item
            clickable
            icon="fas fa-user"
            label="Online players"
            v-model="expanded"
          >
            <OnlineList />
          </q-expansion-item>
        </div>
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
import chatForm from "../components/chatForm";
import OnlineList from "../components/scenario/OnlineList";

export default {
  name: "MyLayout",
  components: { chatForm, OnlineList },

  mounted() {
    //this.$q.addressbarColor.set("#027BE3");
  },

  data() {
    return {
      chatOpen: this.$store.getters.getChatOpen,
      right: true,
      appName: process.env.APP_NAME,
      expanded: true
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters.loggedIn;
    },
    isInGame() {
      return this.$store.getters.getIsInGame;
    },
    unreadMessages() {
      return this.$store.getters.getUnreadMessages;
    }
  },

  methods: {
    ...mapActions(["fetchAccessToken"]),
    logout() {
      this.$store.dispatch("logout", {});
    },
    goToProfile() {
      this.$router.push("profile", () => {});
    },
    toggleChatOpen() {
      this.$store
        .dispatch("toggleChatOpen", this.$refs.drawer.value)
        .then(() => {
          this.$refs.drawer.toggle();
          console.log("Chat: " + this.$store.getters.getChatOpen);
        });
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
