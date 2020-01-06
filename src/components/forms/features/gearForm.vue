<template>
  <div class="text-center">
    <div v-if="gear.scenarioKey === null">
      <h5>This gear cannot be edited</h5>
      <h5>Name: {{ gear.name }}</h5>
      <h5>Cost: {{ gear.cost }}</h5>
      <h5>Weight: {{ gear.weight }}</h5>
      <p>Description: {{ gear.description }}</p>
    </div>
    <q-form
      @submit="createFeature"
      @reset="onReset"
      class="q-gutter-md"
      v-else-if="gearName === 'new'"
    >
      <q-input filled label="Name" :rules="[]" v-model="gear.name" />
      <q-input filled label="Cost" :rules="[]" v-model="gear.cost" />
      <q-input filled label="weight" type="number" :rules="[]" v-model="gear.weight" />
      <q-input
        filled
        label="Description"
        :rules="[]"
        v-model="gear.description"
      />
      <q-toggle color="green" label="Visible" v-model="gear.visible" />
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
      v-else-if="gearName !== 'new' && searchResultFound === true"
    >
      <h5>Gear: {{ gear.name }}</h5>
      <q-input filled label="Cost" :rules="[]" v-model="gear.cost" />
      <q-input filled label="weight" type="number" :rules="[]" v-model="gear.weight" />
      <q-input
        filled
        label="Description"
        :rules="[]"
        v-model="gear.description"
      />
      <q-toggle color="green" label="Visible" v-model="gear.visible" />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
    <div v-else>
      <h5>Haven't found gear with name: {{ gearName }}</h5>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import notifications from "../../../functions/notifications";

export default {
  data() {
    return {
      gearName: "",
      gear: {
        name: "",
        cost: "",
        description: "",
        weight: 0,
        visible: false
      },
      searchResultFound: false
    };
  },
  mounted() {
    this.gearName = this.$route.params.gearName;
    if (this.gearName !== "new") {
      this.getExactFeatureByName(this.gearName);
    }
    //new -> no fill to fields, submit creates a new one
    //existing -> fill fields, name cannot be changed , submit patch existing one
    //not new and not existing -> 404!
  },
  methods: {
    createFeature() {
      var targetURL =
        "api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/gear";
      axios
        .post(
          targetURL,
          {
            description: this.gear.description,
            name: this.gear.name,
            cost: this.gear.cost,
            weight: this.gear.weight,
            visible: this.gear.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully created gear"
          );
          this.gear.description = "";
          this.gear.name = "";
          this.gear.cost = "";
          this.gear.weight = 0;
          this.gear.visible = false;
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
        "api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/gear";
      axios
        .patch(
          targetURL,
          {
            description: this.gear.description,
            name: this.gear.name,
            cost: this.gear.cost,
            weight: this.gear.weight,
            visible: this.gear.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully updated gear"
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
      this.gear.description = "";
      this.gear.name = "";
      this.gear.cost = "";
      this.gear.weight = 0;
      this.gear.visible = false;
    },
    getExactFeatureByName(gearName) {
      var targetURL =
        "api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/gear";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: gearName
          }
        })
        .then(response => {
          console.log("This is mounted method");
          var resp = response.data;
          console.log("This is returned feature", resp);
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].name.toLowerCase() === gearName.toLowerCase()) {
              console.log("Condition fulfilled" + resp[i].name.toLowerCase());
              this.gear = resp[i];
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
