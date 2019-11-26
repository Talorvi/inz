import axios from "axios";
import Vue from "vue";
import VueCookies from "vue-cookies";
import notifications from "../../functions/notifications";
// eslint-disable-next-line no-unused-vars
import { addSeconds, differenceInMilliseconds } from "date-fns";

Vue.use(VueCookies);
VueCookies.config("12h");

export default {
  state: {
    accessToken: null,
    username: VueCookies.get("username")
  },
  getters: {
    loggedIn: state => {
      return state.accessToken;
    },
    getUserName: state => {
      return state.username;
    }
  },
  mutations: {
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
    },
    updateUsername: (state, username) => {
      state.username = username;
    }
  },
  actions: {
    retrieveToken: function(context, credentials) {
      const auth = {
        username: process.env.API_USERNAME,
        password: process.env.API_PASSWORD
      };

      credentials.quasar.loading.show();

      axios
        .post("api/oauth/token", null, {
          params: {
            grant_type: "password",
            username: credentials.username,
            password: credentials.password
          },
          auth: auth
        })

        .then(response => {
          if (response.status === 200) {
            notifications.methods.sendSuccessNotification(
              "Successfully logged in!"
            );

            VueCookies.set("username", credentials.username, "Infinity");
            VueCookies.set("token", response.data.access_token, "12h");
            VueCookies.set("refreshToken", response.data.refresh_token, "12h");
            VueCookies.set(
              "refreshTime",
              addSeconds(new Date(), response.data.expires_in - 3480),
              "12h"
            );

            this.commit("updateAccessToken", VueCookies.get("token"));
            this.commit("updateUsername", credentials.username);

            const refreshTime = addSeconds(
              new Date(),
              response.data.expires_in - 3480
            );

            const now = new Date();

            setTimeout(function() {
              refreshToken(context);
            }, differenceInMilliseconds(refreshTime, now));

            this.$router.push("/home", () => {});
          }
        })
        .catch(error => {
          notifications.methods.sendErrorNotification(
            error.response.data.error_description
          );
        })

        .finally(() => {
          credentials.quasar.loading.hide();
        });
    },
    register(context, credentials) {
      credentials.quasar.loading.show();

      axios
        .post("/api/register", {
          username: credentials.username,
          password: credentials.password,
          email: credentials.email
        })

        .then(response => {
          if (response.status === 200) {
            notifications.methods.sendSuccessNotification(
              "Successfully registered!"
            );
            this.$router.push("/", () => {});
          }
        })
        .catch(error => {
          notifications.methods.sendErrorNotification(error.response.data);
        })
        .finally(() => {
          credentials.quasar.loading.hide();
        });
    },
    fetchAccessToken({ commit }) {
      commit("updateAccessToken", VueCookies.get("token"));
    },
    logout: function(context) {
      VueCookies.remove("token");
      VueCookies.remove("username");
      VueCookies.remove("refreshToken");
      VueCookies.remove("refreshTime");
      context.commit("updateAccessToken", VueCookies.get("token"));

      notifications.methods.sendSuccessNotification("Successfully logged out!");
      this.$router.push("/", () => {});
    },
    refreshToken: function(context) {
      refreshToken(context);
    }
  }
};

function refreshToken(context) {
  if (VueCookies.isKey("refreshToken")) {
    const auth = {
      username: process.env.API_USERNAME,
      password: process.env.API_PASSWORD
    };

    axios
      .post("api/oauth/token", null, {
        params: {
          grant_type: "refresh_token",
          refresh_token: VueCookies.get("refreshToken")
        },
        auth: auth
      })

      .then(response => {
        if (response.status === 200) {
          VueCookies.set("token", response.data.access_token, "12h");
          VueCookies.set("refreshToken", response.data.refresh_token, "12h");
          VueCookies.set(
            "refreshTime",
            addSeconds(new Date(), response.data.expires_in),
            "12h"
          );

          context.commit("updateAccessToken", response.data.access_token);
        }
      })

      // eslint-disable-next-line no-unused-vars
      .catch(error => {
        VueCookies.remove("token");
        VueCookies.remove("username");
        VueCookies.remove("refreshToken");
        VueCookies.remove("refreshTime");
        context.commit("updateAccessToken", null);
      });
  }
}
