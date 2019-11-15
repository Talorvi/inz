import Vue from "vue";
import Vuex from "vuex";
import VueCookies from "vue-cookies";

import user from "./user";
import registration from "./registration";
import game from "./game";
import currentSession from "./currentSession"

Vue.use(Vuex);
Vue.use(VueCookies);

export default new Vuex.Store({
  modules: {
    user: user,
    registration: registration,
    game: game,
    currentSession: currentSession
  }
});
