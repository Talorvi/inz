<template>
  <div class="text-center">
    <div v-if="vehicle.scenarioKey === null">
      <h5>This vehicle cannot be edited</h5>
      <h5>Name: {{ vehicle.name }}</h5>
      <h5>Cost: {{ vehicle.cost }}</h5>
      <h5>Weight: {{ vehicle.weight }}</h5>
      <p>Description: {{ vehicle.description }}</p>
    </div>
    <q-form
      @submit="createFeature"
      @reset="onReset"
      class="q-gutter-md"
      v-else-if="vehicleName === 'new'"
    >
      <q-input filled label="Name" :rules="[
         val =>(val && val.length > 0) || 'Field cannot be empty']" v-model="vehicle.name" />
      <q-input filled label="Cost" :rules="[]" v-model="vehicle.cost" />
      <q-input filled label="Weight(pounds)" type="number" :rules="[]" v-model="vehicle.weight" />
      <q-input
        filled
        label="Description"
        :rules="[]"
        v-model="vehicle.description"
      />
      <q-toggle color="green" label="Visible" v-model="vehicle.visible" />
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
      v-else-if="vehicleName !== 'new' && searchResultFound === true"
    >
      <h5>Vehicle: {{ vehicle.name }}</h5>
      <q-input filled label="Cost" :rules="[]" v-model="vehicle.cost" />
      <q-input filled label="Weight(pounds)" type="number" :rules="[]" v-model="vehicle.weight" />
      <q-input
        filled
        label="Description"
        :rules="[]"
        v-model="vehicle.description"
      />
      <q-toggle color="green" label="Visible" v-model="vehicle.visible" />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
    <div v-else>
      <h5>Haven't found vehicle with name: {{ vehicleName }}.</h5>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import notifications from "../../../functions/notifications";
export default {
  data() {
    return {
      vehicleName: "",
      vehicle: {
        name: "",
        cost: "",
        weight: 0,
        description: "",
        visible: false
      },
      searchResultFound: false
    };
  },
  mounted() {
    this.vehicleName = this.$route.params.vehicleName;
    if (this.vehicleName !== "new") {
      this.getExactFeatureByName(this.vehicleName);
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
        "/vehicle";
      axios
        .post(
          targetURL,
          {
            description: this.vehicle.description,
            name: this.vehicle.name,
            cost: this.vehicle.cost,
            weight: this.vehicle.weight,
            visible: this.vehicle.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully created vehicle"
          );
          this.vehicle.description = "";
          this.vehicle.name = "";
          this.vehicle.cost = "";
          this.vehicle.weight = 0;
          this.vehicle.visible = false;
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
        "/vehicle";
      axios
        .patch(
          targetURL,
          {
            description: this.vehicle.description,
            name: this.vehicle.name,
            cost: this.vehicle.cost,
            weight: this.vehicle.weight,
            visible: this.vehicle.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully updated vehicle"
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
      this.vehicle.description = "";
      this.vehicle.name = "";
      this.vehicle.cost = "";
      this.vehicle.weight = 0;
      this.vehicle.visible = false;
    },
    getExactFeatureByName(vehicleName) {
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/vehicle";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: vehicleName
          }
        })
        .then(response => {
          var resp = response.data;
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].name.toLowerCase() === vehicleName.toLowerCase()) {
              this.vehicle = resp[i];
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
