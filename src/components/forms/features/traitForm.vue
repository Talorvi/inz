<template>
  <div class="text-center">
    <div v-if="trait.scenarioKey === null">
      <h5>This trait cannot be edited</h5>
      <h5>Name: {{ trait.name }}</h5>
      <p>Description: {{ trait.description }}</p>
    </div>
    <q-form
      @submit="createFeature"
      @reset="onReset"
      class="q-gutter-md"
      v-else-if="traitName === 'new'"
    >
      <q-input filled label="Name" :rules="[]" v-model="trait.name" />
      <q-input
        filled
        label="Description"
        :rules="[]"
        v-model="trait.description"
      />
      <q-toggle color="green" label="Visible" v-model="trait.visible" />
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
      v-else-if="traitName !== 'new' && searchResultFound === true"
    >
      <h5>Trait: {{ trait.name }}</h5>
      <q-input
        filled
        label="Description"
        :rules="[]"
        v-model="trait.description"
      />
      <q-toggle color="green" label="Visible" v-model="trait.visible" />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
    <div v-else>
      <h5>Haven't found trait with name: {{ traitName }}.</h5>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import notifications from "../../../functions/notifications";
export default {
  data() {
    return {
      traitName: "",
      trait: {
        name: "",
        description: "",
        visible: false
      },
      searchResultFound: false
    };
  },
  mounted() {
    this.traitName = this.$route.params.traitName;
    if (this.traitName !== "new") {
      this.getExactFeatureByName(this.traitName);
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
        "/trait";
      axios
        .post(
          targetURL,
          {
            description: this.trait.description,
            name: this.trait.name,
            visible: this.trait.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully created trait"
          );
          this.trait.description = "";
          this.trait.name = "";
          this.trait.visible = false;
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
        "/trait";
      axios
        .patch(
          targetURL,
          {
            description: this.trait.description,
            name: this.trait.name,
            visible: this.trait.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully updated trait"
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
      this.trait.description = "";
      this.trait.name = "";
      this.trait.visible = false;
    },
    getExactFeatureByName(traitName) {
      var targetURL =
        "api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/trait";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: traitName
          }
        })
        .then(response => {
          var resp = response.data;
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].name.toLowerCase() === traitName.toLowerCase()) {
              this.trait = resp[i];
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
