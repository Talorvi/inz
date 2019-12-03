<template>
  <div>
    <div v-if="feature.scenarioKey === null">
      <h5>This feature cannot be edited</h5>
      <h5>Name: {{ feature.name }}</h5>
      <p>Description: {{ feature.description }}</p>
    </div>
    <q-form
      @submit="createFeature"
      @reset="onReset"
      class="q-gutter-md"
      v-else-if="featureName === 'new'"
    >
      <q-input filled label="Name" :rules="[]" v-model="feature.name" />
      <q-input
        filled
        label="Description"
        :rules="[]"
        v-model="feature.description"
      />
      <q-toggle color="green" label="Visible" v-model="feature.visible" />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
    <q-form
      @submit="updateFeature"
      class="q-gutter-md"
      v-else-if="featureName !== 'new' && searchResultFound === true"
    >
      <h3>Feature: {{ feature.name }}</h3>
      <q-input
        filled
        label="Description"
        :rules="[]"
        v-model="feature.description"
      />
      <q-toggle color="green" label="Visible" v-model="feature.visible" />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
    <div v-else>
      <h5>Haven't found feature with name: {{featureName}}.</h5>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import notifications from "../../../functions/notifications";
export default {
  data() {
    return {
      featureName: "",
      feature: {
        name: "",
        description: "",
        visible: false
      },
      searchResultFound: false
    };
  },
  mounted() {
    this.featureName = this.$route.params.featureName;
    if (this.featureName !== "new") {
      this.getExactFeatureByName(this.featureName);
    }
    //new -> no fill to fields, submit creates a new one
    //existing -> fill fields, name cannot be changed , submit patch existing one
    //not new and not existing -> 404!
  },
  methods: {
    createFeature() {
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/feature";
      axios
        .post(
          targetURL,
          {
            description: this.feature.description,
            name: this.feature.name,
            visible: this.feature.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully created feature"
          );
          this.feature.description = "";
          this.feature.name = "";
          this.feature.visible = false;
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    updateFeature() {
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/feature";
      axios
        .patch(
          targetURL,
          {
            description: this.feature.description,
            name: this.feature.name,
            visible: this.feature.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully updated feature"
          );
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    onReset() {
      this.feature.description = "";
      this.feature.name = "";
      this.feature.visible = false;
    },
    getExactFeatureByName(featureName) {
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/feature";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: featureName
          }
        })
        .then(response => {
          console.log("This is mounted method");
          var resp = response.data;
          console.log("This is returned feature", resp);
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].name.toLowerCase() === featureName.toLowerCase()) {
              console.log("Condition fulfilled" + resp[i].name.toLowerCase());
              this.feature = resp[i];
              this.searchResultFound = true;
              break;
            }
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
  }
};
</script>
