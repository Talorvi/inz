import axios from "axios";
import functions from "../../functions/notifications";
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
          Authorization: "Bearer " + VueCookies.get("token")
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
          functions.methods.sendErrorNotification();
        });
    },
    addNewScenario: function(context, data) {
      data.quasar.loading.show();
      var config = {
        headers: {
          Authorization: "Bearer " + VueCookies.get("token")
        }
      };
      var postData = {
        name: data.name,
        password: data.password
      };
      axios
        .post("http://localhost:8080/api/v1/scenario", postData, config)
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          data.quasar.loading.hide();
          this.$router.push("/success/" + response.data, () => {});
        })
        .catch(error => {
          console.log(JSON.stringify(error));
          data.quasar.loading.hide();
          functions.methods.sendErrorNotification();
        });
    },
    joinScenario: function(context, data) {
      data.quasar.loading.show();
      var config = {
        headers: {
          Authorization: "Bearer " + VueCookies.get("token")
        }
      };
      var postData = {
        password: data.password
      };
      axios
        .post(
          "http://localhost:8080/action/join/scenario/" +
            data.scenarioKey,
          postData,
          config
        )
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          data.quasar.loading.hide();
          this.$router.push("/join-success", () => {});
        })
        .catch(error => {
          console.log(JSON.stringify(error));
          data.quasar.loading.hide();
          functions.methods.sendErrorNotification();
        });
    }
  }
};
