<template>
  <div>
    <div v-if="damageType.scenarioKey === null">
      <h5>This Damage Type cannot be edited</h5>
      <h5>Name: {{ damageType.name }}</h5>
      <p>Description: {{ damageType.description }}</p>
    </div>
    <q-form
      @submit="createFeature"
      @reset="onReset"
      class="q-gutter-md"
      v-else-if="damageTypeName === 'new'"
    >
      <q-input filled label="Name" :rules="[]" v-model="damageType.name" />
      <q-input
        filled
        label="Description"
        :rules="[]"
        v-model="damageType.description"
      />
      <q-toggle color="green" label="Visible" v-model="damageType.visible" />
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
      v-else-if="damageTypeName !== 'new' && searchResultFound === true"
    >
      <h3>Damage Type: {{ damageType.name }}</h3>
      <q-input
        filled
        label="Description"
        :rules="[]"
        v-model="damageType.description"
      />
      <q-toggle color="green" label="Visible" v-model="damageType.visible" />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
    <div v-else>
      <h5>Haven't found Damage Type with name: {{ damageTypeName }}.</h5>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import notifications from "../../../functions/notifications";
export default {
  data() {
    return {
      damageTypeName: "",
      damageType: {
        name: "",
        description: "",
        visible: false
      },
      searchResultFound: false
    };
  },
  mounted() {
    this.damageTypeName = this.$route.params.damageTypeName;
    if (this.damageTypeName !== "new") {
      this.getExactFeatureByName(this.damageTypeName);
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
        "/damageType";
      axios
        .post(
          targetURL,
          {
            description: this.damageType.description,
            name: this.damageType.name,
            visible: this.damageType.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully created damageType"
          );
          this.damageType.description = "";
          this.damageType.name = "";
          this.damageType.visible = false;
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
        "/damageType";
      axios
        .patch(
          targetURL,
          {
            description: this.damageType.description,
            name: this.damageType.name,
            visible: this.damageType.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully updated damageType"
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
      this.damageType.description = "";
      this.damageType.name = "";
      this.damageType.visible = false;
    },
    getExactFeatureByName(damageTypeName) {
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/damageType";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: damageTypeName
          }
        })
        .then(response => {
          var resp = response.data;
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].name.toLowerCase() === damageTypeName.toLowerCase()) {
              this.damageType = resp[i];
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
