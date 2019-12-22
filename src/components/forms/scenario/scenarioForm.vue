<template>
  <div>
    <q-form @submit="updateScenarioPassword" class="text-center">
      <q-input
        v-model="password"
        filled
        type="password"
        label="Password"
        class="q-pb-lg"
      >
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
      </q-input>
      <q-btn
        class="text-weight-bold"
        type="submit"
        flat
        size="lg"
        label="Change password"
        color="accent"
      />
    </q-form>
  </div>
</template>

<script>
import axios from "axios";
import notifications from "../../../functions/notifications";
import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

export default {
  name: "ScenarioForm",
  methods: {
    updateScenarioPassword() {
      var targetURL =
        "api/action/change/password/scenario/" +
        this.$store.getters.getScenarioKey;
      axios
        .post(
          targetURL,
          { password: this.password },
          {
            headers: { Authorization: "bearer " + VueCookies.get("token") }
          }
        )
        .then(response => {
          if (response.status === 200) {
            notifications.methods.sendSuccessNotification(
              "Successfully changed the password!"
            );
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    }
  },
  data() {
    return {
      password: ""
    };
  }
};
</script>
