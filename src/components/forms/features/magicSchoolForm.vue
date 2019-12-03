<template>
  <div>
    <div v-if="magicSchool.scenarioKey === null">
      <h5>This Magic School cannot be edited</h5>
      <h5>Name: {{ magicSchool.name }}</h5>
      <p>Description: {{ magicSchool.description }}</p>
    </div>
    <q-form
      @submit="createFeature"
      @reset="onReset"
      class="q-gutter-md"
      v-else-if="magicSchoolName === 'new'"
    >
      <q-input filled label="Name" :rules="[]" v-model="magicSchool.name" />
      <q-input
        filled
        label="Description"
        :rules="[]"
        v-model="magicSchool.description"
      />
      <q-toggle color="green" label="Visible" v-model="magicSchool.visible" />
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
      v-else-if="magicSchoolName !== 'new' && searchResultFound === true"
    >
      <h3>Magic School: {{ magicSchool.name }}</h3>
      <q-input
        filled
        label="Description"
        :rules="[]"
        v-model="magicSchool.description"
      />
      <q-toggle color="green" label="Visible" v-model="magicSchool.visible" />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
    <div v-else>
      <h5>Haven't found Magic School with name: {{ magicSchoolName }}.</h5>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import notifications from "../../../functions/notifications";
export default {
  data() {
    return {
      magicSchoolName: "",
      magicSchool: {
        name: "",
        description: "",
        visible: false
      },
      searchResultFound: false
    };
  },
  mounted() {
    this.magicSchoolName = this.$route.params.magicSchoolName;
    if (this.magicSchoolName !== "new") {
      this.getExactFeatureByName(this.magicSchoolName);
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
        "/magicSchool";
      axios
        .post(
          targetURL,
          {
            description: this.magicSchool.description,
            name: this.magicSchool.name,
            visible: this.magicSchool.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully created Magic School"
          );
          this.magicSchool.description = "";
          this.magicSchool.name = "";
          this.magicSchool.visible = false;
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
        "/magicSchool";
      axios
        .patch(
          targetURL,
          {
            description: this.magicSchool.description,
            name: this.magicSchool.name,
            visible: this.magicSchool.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully updated Magic School"
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
      this.magicSchool.description = "";
      this.magicSchool.name = "";
      this.magicSchool.visible = false;
    },
    getExactFeatureByName(magicSchoolName) {
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/magicSchool";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: magicSchoolName
          }
        })
        .then(response => {
          console.log("This is mounted method");
          var resp = response.data;
          console.log("This is returned feature", resp);
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].name.toLowerCase() === magicSchoolName.toLowerCase()) {
              console.log("Condition fulfilled" + resp[i].name.toLowerCase());
              this.magicSchool = resp[i];
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
