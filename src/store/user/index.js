import axios from "axios";
import { Notify } from "quasar";

export default {
  state: {
    //TODO: cookies
    loggedIn: false
  },
  mutations: {},
  getters: {
    loggedIn: state => {
      return state.loggedIn;
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
          console.log(response);
          if (response.status === 200) {
            Notify.create({
              color: "green-5",
              textColor: "white",
              icon: "done",
              message: "Successfully logged in!",
              timeout: 1500,
              position: "bottom-right"
            });
            this.$router.push("/home");
            context.state.loggedIn = true;
          }
        })
        .catch(error => {
          console.log(error);
          Notify.create({
            color: "red-5",
            textColor: "white",
            icon: "error",
            message: "Could not log in",
            timeout: 1500,
            position: "bottom-right"
          });
        });

      credentials.quasar.loading.hide();
    },
    register(context, credentials) {
      axios
        .post(
          "/register",
          null,
          {
            params: {
              grant_type: "password",
              username: credentials.username,
              password: credentials.password
            }
          }
          // { headers: headers }
        )
        .then(response => console.log(response))
        .catch(console.error);
      console.log(credentials.username);
    }
  }
};
