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
    accessToken: null
  },
  getters: {
    loggedIn: state => {
      return state.accessToken;
    }
  },
  mutations: {
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
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

            VueCookies.set("username", credentials.username, "12h");
            VueCookies.set("token", response.data.access_token, "12h");
            VueCookies.set("refreshToken", response.data.refresh_token, "12h");
            VueCookies.set(
              "refreshTime",
              addSeconds(new Date(), response.data.expires_in - 3480),
              "12h"
            );

            this.commit("updateAccessToken", VueCookies.get("token"));

            const refreshTime = addSeconds(
              new Date(),
              response.data.expires_in - 3480
            );

            console.log("Token odświeży się: " + refreshTime);

            const now = new Date();

            setTimeout(function() {
              refreshToken(context);
            }, differenceInMilliseconds(refreshTime, now));

            this.$router.push("/home", () => {});
          }
        })

        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          notifications.methods.sendErrorNotification(
            "There was an error. Couldn't log in."
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

        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          notifications.methods.sendErrorNotification(
            "There was an error. Couldn't log in."
          );
        })

        .finally(() => {
          credentials.quasar.loading.hide();
        });
    },
    fetchAccessToken({ commit }) {
      commit("updateAccessToken", VueCookies.get("token"));
    },
    // eslint-disable-next-line no-unused-vars
    logout: function(context) {
      VueCookies.remove("token");
      VueCookies.remove("username");
      VueCookies.remove("refreshToken");
      VueCookies.remove("refreshTime");
      this.commit("updateAccessToken", VueCookies.get("token"));

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
    console.log("Oświeżanie tokenu");

    console.log("Stary token: " + VueCookies.get("token"));

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
          console.log("Nowy token: " + VueCookies.get("token"));
        }
      })

      // eslint-disable-next-line no-unused-vars
      .catch(error => {
        console.log(error);
        VueCookies.remove("token");
        VueCookies.remove("username");
        VueCookies.remove("refreshToken");
        VueCookies.remove("refreshTime");
        context.commit("updateAccessToken", null);
      });
  }
}
