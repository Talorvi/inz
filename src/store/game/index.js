import axios from "axios";
import { Notify } from "quasar";
//import Vue from "vue";
import VueCookies from "vue-cookies";
export default {
  state: {
    gameList: null
  },
  mutations: {
    updateGameList: (state, gameList) => {
      state.gameList = gameList;
    }
  },
  getters: {
    getGameList: state => {
      return state.gameList;
    }
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    retrieveGameList: function(context, data) {
      data.data.loading.show();
      var config = {
        headers: {
          Authorization: "Bearer " + VueCookies.get("token"),
          accept: "*/*"
        }
      };

      axios
        .get("http://localhost:8080/api/v1/scenario", config)
        .then(response => {
          this.commit("updateGameList", response.data);
          data.data.loading.hide();
        })
        .catch(error => {
          console.log(error);
          data.data.loading.hide();
          Notify.create({
            color: "red-5",
            textColor: "white",
            icon: "error",
            message: "Oops, there was an error!",
            timeout: 1500,
            position: "bottom-right"
          });
        });
    }
  }
};
