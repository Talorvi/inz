<template>
  <div class="text-center">
    <div v-if="proficiency.scenarioKey === null">
      <h5>This feature cannot be edited</h5>
      <h5>Name: {{ proficiency.name }}</h5>
      <h5>Type: {{ proficiency.type }}</h5>
    </div>
    <q-form
      @submit="createFeature"
      @reset="onReset"
      class="q-gutter-md"
      v-else-if="proficiencyName === 'new'"
    >
      <q-input filled label="Name" :rules="[
         val =>(val && val.length > 0) || 'Field cannot be empty']" v-model="proficiency.name" />
      <q-input filled label="Type" :rules="[]" v-model="proficiency.type" />
      <q-toggle color="green" label="Visible" v-model="proficiency.visible" />
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
      v-else-if="proficiencyName !== 'new' && searchResultFound === true"
    >
      <h5>Proficiency: {{ proficiency.name }}</h5>
      <q-input filled label="Type" :rules="[]" v-model="proficiency.type" />
      <q-toggle color="green" label="Visible" v-model="proficiency.visible" />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
    <div v-else>
      <h5>Haven't found proficiency with name: {{proficiencyName}}.</h5>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import notifications from "../../../functions/notifications";
export default {
  data() {
    return {
      proficiencyName: "",
      proficiency: {
        name: "",
        type: "",
        visible: false
      },
      searchResultFound: false
    };
  },
  mounted() {
    this.proficiencyName = this.$route.params.proficiencyName;
    if (this.proficiencyName !== "new") {
      this.getExactFeatureByName(this.proficiencyName);
    }
    //not new and not existing -> 404!
  },
  methods: {
    createFeature() {
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/proficiency";
      axios
        .post(
          targetURL,
          {
            type: this.proficiency.type,
            name: this.proficiency.name,
            visible: this.proficiency.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully created proficiency"
          );
          this.proficiency.type = "";
          this.proficiency.name = "";
          this.proficiency.visible = false;
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
        "/proficiency";
      axios
        .patch(
          targetURL,
          {
            type: this.proficiency.type,
            name: this.proficiency.name,
            visible: this.proficiency.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully updated proficiency"
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
      this.proficiency.type = "";
      this.proficiency.name = "";
      this.proficiency.visible = false;
    },
    getExactFeatureByName(proficiencyName) {
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/proficiency";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: proficiencyName
          }
        })
        .then(response => {
          var resp = response.data;

          for (var i = 0; i < resp.length; i++) {
            if (resp[i].name.toLowerCase() === proficiencyName.toLowerCase()) {
              this.proficiency = resp[i];
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
