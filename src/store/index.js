import Vue from "vue";
import Vuex from "vuex";

// import example from './module-example'
import user from './user';
import registration from './registration';


Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      user: user,
      registration: registration
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
