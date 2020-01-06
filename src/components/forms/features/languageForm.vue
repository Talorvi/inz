<template>
  <div class="text-center">
    <div v-if="language.scenarioKey === null">
      <h5>This language cannot be edited</h5>
      <h5>Name: {{ language.name }}</h5>
      <h5>Type: {{ language.type }}</h5>
      <h5>Script: {{ language.script }}</h5>
    </div>
    <q-form
      @submit="createFeature"
      @reset="onReset"
      class="q-gutter-md"
      v-else-if="languageName === 'new'"
    >
      <q-input filled label="Name" :rules="[]" v-model="language.name" />
      <q-input filled label="Type" :rules="[]" v-model="language.type" />
      <q-input filled label="Script" :rules="[]" v-model="language.script" />
      <q-toggle color="green" label="Visible" v-model="language.visible" />
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
      v-else-if="languageName !== 'new' && searchResultFound === true"
    >
      <h5>Language: {{ language.name }}</h5>
      <q-input filled label="Type" :rules="[]" v-model="language.type" />
      <q-input filled label="Script" :rules="[]" v-model="language.script" />
      <q-toggle color="green" label="Visible" v-model="language.visible" />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
    <div v-else>
      <h5>Haven't found language with name: {{languageName}}.</h5>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import notifications from "../../../functions/notifications";

export default {
  data() {
    return {
      languageName: "",
      language: {
        name: "",
        script: "",
        type: "",
        visible: false
      },
      searchResultFound: false
    };
  },
  mounted() {
    this.languageName = this.$route.params.languageName;
    if (this.languageName !== "new") {
      this.getExactFeatureByName(this.languageName);
    }
  },
  methods: {
    createFeature() {
      var targetURL =
        "api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/language";
      axios
        .post(
          targetURL,
          {
            script: this.language.script,
            type: this.language.type,
            name: this.language.name,
            visible: this.language.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully created language"
          );
          this.language.script = "";
          this.language.type = "";
          this.language.name = "";
          this.language.visible = false;
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
        "/language";
      axios
        .patch(
          targetURL,
          {
            script: this.language.script,
            type: this.language.type,
            name: this.language.name,
            visible: this.language.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully updated language"
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
      this.language.script = "";
      this.language.type = "";
      this.language.name = "";
      this.language.visible = false;
    },
    getExactFeatureByName(languageName) {
      var targetURL =
        "api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/language";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: languageName
          }
        })
        .then(response => {
          var resp = response.data;

          for (var i = 0; i < resp.length; i++) {
            if (resp[i].name.toLowerCase() === languageName.toLowerCase()) {
              this.language = resp[i];
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
