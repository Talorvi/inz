<template>
  <div>
    <div v-if="condition.scenarioKey === null">
      <h5>This condition cannot be edited</h5>
      <h5>Name: {{ condition.name }}</h5>
      <p>Description: {{ condition.description }}</p>
    </div>
    <q-form
      @submit="createFeature"
      @reset="onReset"
      class="q-gutter-md"
      v-else-if="conditionName === 'new'"
    >
      <q-input filled label="Name" :rules="[]" v-model="condition.name" />
      <q-input
        filled
        label="Description"
        :rules="[]"
        v-model="condition.description"
      />
      <q-toggle color="green" label="Visible" v-model="condition.visible" />
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
      v-else-if="conditionName !== 'new' && searchResultFound === true"
    >
      <h3>Condition: {{ condition.name }}</h3>
      <q-input
        filled
        label="Description"
        :rules="[]"
        v-model="condition.description"
      />
      <q-toggle color="green" label="Visible" v-model="condition.visible" />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
    <div v-else>
      <h5>Haven't found condition with name: {{ conditionName }}.</h5>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import notifications from "../../../functions/notifications";
export default {
  data() {
    return {
      conditionName: "",
      condition: {
        name: "",
        description: "",
        visible: false
      },
      searchResultFound: false
    };
  },
  mounted() {
    this.conditionName = this.$route.params.conditionName;
    if (this.conditionName !== "new") {
      this.getExactFeatureByName(this.conditionName);
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
        "/condition";
      axios
        .post(
          targetURL,
          {
            description: this.condition.description,
            name: this.condition.name,
            visible: this.condition.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully created condition"
          );
          this.condition.description = "";
          this.condition.name = "";
          this.condition.visible = false;
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
        "/condition";
      axios
        .patch(
          targetURL,
          {
            description: this.condition.description,
            name: this.condition.name,
            visible: this.condition.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully updated condition"
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
      this.condition.description = "";
      this.condition.name = "";
      this.condition.visible = false;
    },
    getExactFeatureByName(conditionName) {
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/condition";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: conditionName
          }
        })
        .then(response => {
          var resp = response.data;
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].name.toLowerCase() === conditionName.toLowerCase()) {
              this.condition = resp[i];
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
