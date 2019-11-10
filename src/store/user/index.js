import axios from "axios";
import { Notify } from "quasar";
import Vue from "vue";
import VueCookies from "vue-cookies";

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
          //console.log(response);
          if (response.status === 200) {
            Notify.create({
              color: "green-5",
              textColor: "white",
              icon: "done",
              message: "Successfully logged in!",
              timeout: 1500,
              position: "bottom-right"
            });
            //console.log(response.data);
            VueCookies.set("username", credentials.username, "12h");
            VueCookies.set("token", response.data.access_token, "12h");
            VueCookies.set("refreshToken", response.data.refresh_token, "12h");
            this.commit("updateAccessToken", response.data.access_token);
            this.$router.push("/home");
          }
        })
        .catch(error => {
          console.log(error);
          Notify.create({
            color: "red-5",
            textColor: "white",
            icon: "error",
            message: "",
            timeout: 1500,
            position: "bottom-right"
          });
        });

      credentials.quasar.loading.hide();
    },
    register(context, credentials) {
      axios
        .post(
          "/api/register",
          {
            username: credentials.username,
            password: credentials.password,
            email: credentials.email
          }
          // { headers: headers }
        )
        .then(response => {
          if (response.status === 200) {
            Notify.create({
              color: "green-5",
              textColor: "white",
              icon: "done",
              message: "Successfully registered!",
              timeout: 1500,
              position: "bottom-right"
            });
            this.$router.push("/");
          }
          //console.log(response);
        })
        .catch(error => {
          //console.log(error);
          Notify.create({
            color: "red-5",
            textColor: "white",
            icon: "error",
            message: error.response.data,
            timeout: 1500,
            position: "bottom-right"
          });
        });
      //console.log(credentials.username);
    },
    fetchAccessToken({ commit }) {
      commit("updateAccessToken", VueCookies.get("token"));
    }
  }
};
