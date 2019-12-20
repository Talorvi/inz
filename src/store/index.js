import Vue from "vue";
import Vuex from "vuex";
import VueCookies from "vue-cookies";

import user from "./user";
import game from "./game";
import currentSession from "./currentSession/sessionDescription";

Vue.use(Vuex);
Vue.use(VueCookies);

export default new Vuex.Store({
  modules: {
    user: user,
    game: game,
    currentSession: currentSession
  }
});
