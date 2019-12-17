<template>
  <div>
    <div v-if="skill.scenarioKey === null">
      <h5>This skill cannot be edited</h5>
      <h5>Name: {{ skill.name }}</h5>
      <h5>Ability Score: {{ skill.abilityScore }}</h5>
      <p>Description: {{ skill.description }}</p>
    </div>
    <q-form
      @submit="createFeature"
      @reset="onReset"
      class="q-gutter-md"
      v-else-if="skillName === 'new'"
    >
      <q-input filled label="Name" :rules="[]" v-model="skill.name" />
      <q-input filled label="Ability Score" :rules="[]" v-model="skill.abilityScore" />
      <q-input
        filled
        label="Description"
        :rules="[]"
        v-model="skill.description"
      />
      <q-toggle color="green" label="Visible" v-model="skill.visible" />
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
      v-else-if="skillName !== 'new' && searchResultFound === true"
    >
      <h3>Feature: {{ skill.name }}</h3>
      <q-input filled label="Ability Score" :rules="[]" v-model="skill.abilityScore" />
      <q-input
        filled
        label="Description"
        :rules="[]"
        v-model="skill.description"
      />
      <q-toggle color="green" label="Visible" v-model="skill.visible" />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
    <div v-else>
      <h5>Haven't found skill with name: {{ skillName }}.</h5>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import notifications from "../../../functions/notifications";
export default {
  data() {
    return {
      skillName: "",
      skill: {
        name: "",
        description: "",
        abilityScore: "",
        visible: false
      },
      searchResultFound: false
    };
  },
  mounted() {
    this.skillName = this.$route.params.skillName;
    if (this.skillName !== "new") {
      this.getExactFeatureByName(this.skillName);
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
        "/skill";
      axios
        .post(
          targetURL,
          {
            description: this.skill.description,
            abilityScore: this.skill.abilityScore,
            name: this.skill.name,
            visible: this.skill.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully created feature"
          );
          this.skill.description = "";
          this.skill.abilityScore = "";
          this.skill.name = "";
          this.skill.visible = false;
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
        "/skill";
      axios
        .patch(
          targetURL,
          {
            description: this.skill.description,
            abilityScore: this.skill.abilityScore,
            name: this.skill.name,
            visible: this.skill.visible
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
      this.skill.description = "";
      this.skill.abilityScore = "";
      this.skill.name = "";
      this.skill.visible = false;
    },
    getExactFeatureByName(skillName) {
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/skill";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: skillName
          }
        })
        .then(response => {
          var resp = response.data;
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].name.toLowerCase() === skillName.toLowerCase()) {
              this.skill = resp[i];
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
