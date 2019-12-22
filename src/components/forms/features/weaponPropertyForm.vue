<template>
  <div class="text-center">
    <div v-if="weaponProperty.scenarioKey === null">
      <h5>This Weapon Property cannot be edited</h5>
      <h5>Name: {{ weaponProperty.name }}</h5>
      <p>Description: {{ weaponProperty.description }}</p>
    </div>
    <q-form
      @submit="createFeature"
      @reset="onReset"
      class="q-gutter-md"
      v-else-if="weaponPropertyName === 'new'"
    >
      <q-input filled label="Name" :rules="[]" v-model="weaponProperty.name" />
      <q-input
        filled
        label="Description"
        :rules="[]"
        v-model="weaponProperty.description"
      />
      <q-toggle color="green" label="Visible" v-model="weaponProperty.visible" />
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
      v-else-if="weaponPropertyName !== 'new' && searchResultFound === true"
    >
      <h5>Weapon Property: {{ weaponProperty.name }}</h5>
      <q-input
        filled
        label="Description"
        :rules="[]"
        v-model="weaponProperty.description"
      />
      <q-toggle color="green" label="Visible" v-model="weaponProperty.visible" />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
    <div v-else>
      <h5>Haven't found Weapon Property with name: {{ weaponPropertyName }}.</h5>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import notifications from "../../../functions/notifications";
export default {
  data() {
    return {
      weaponPropertyName: "",
      weaponProperty: {
        name: "",
        description: "",
        visible: false
      },
      searchResultFound: false
    };
  },
  mounted() {
    this.weaponPropertyName = this.$route.params.weaponPropertyName;
    if (this.weaponPropertyName !== "new") {
      this.getExactFeatureByName(this.weaponPropertyName);
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
        "/weaponProperty";
      axios
        .post(
          targetURL,
          {
            description: this.weaponProperty.description,
            name: this.weaponProperty.name,
            visible: this.weaponProperty.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully created Weapon Property"
          );
          this.weaponProperty.description = "";
          this.weaponProperty.name = "";
          this.weaponProperty.visible = false;
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
        "/weaponProperty";
      axios
        .patch(
          targetURL,
          {
            description: this.weaponProperty.description,
            name: this.weaponProperty.name,
            visible: this.weaponProperty.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully updated Weapon Property"
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
      this.weaponProperty.description = "";
      this.weaponProperty.name = "";
      this.weaponProperty.visible = false;
    },
    getExactFeatureByName(weaponPropertyName) {
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/weaponProperty";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: weaponPropertyName
          }
        })
        .then(response => {
          var resp = response.data;
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].name.toLowerCase() === weaponPropertyName.toLowerCase()) {
              this.weaponProperty = resp[i];
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
