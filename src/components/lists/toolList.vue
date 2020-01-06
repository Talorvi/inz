<template>
  <div>
    <div class="text-center">
      <q-btn color="primary" @click="goToNew">
        Add new Tool
      </q-btn>
    </div>
    <q-list bordered separator class="q-mt-md" v-if="featureList.length > 0">
      <q-item
        v-ripple
        active-class="bg-teal-1"
        v-for="(feature, index) in featureList"
      >
        <q-item-section @click="showFeatureDialog(feature)">
          <q-item-label>{{ feature }}</q-item-label>
        </q-item-section>
        <q-btn
          size="12px"
          flat
          dense
          round
          icon="edit"
          color="accent"
          v-on:click="editFeature(feature)"
        />
        <q-item-section side>
          <q-btn
            size="12px"
            flat
            dense
            round
            icon="delete"
            color="accent"
            v-on:click="showDeleteDialog(feature, index)"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">{{ name }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section> <b>Cost: </b> {{ cost }} </q-card-section>
        <q-card-section> <b>Category: </b> {{ category }} </q-card-section>
        <q-card-section> <b>Weight: </b> {{ weight }} </q-card-section>
        <q-card-section>
          <b>Description: </b> {{ description }}
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm"
            >Are you sure you want to remove this element?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            @click="closeDialog()"
            v-close-popup
          />
          <q-btn
            flat
            label="Delete"
            color="primary"
            @click="deleteFeature(nameToDelete, indexToDelete)"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";
import notifications from "../../functions/notifications";
export default {
  data() {
    return {
      featureList: [],
      dialog: false,
      name: "",
      description: "",
      cost: "",
      wight: 0,
      category: "",
      confirm: false,
      indexToDelete: 0,
      nameToDelete: ""
    };
  },
  mounted() {
    this.getCustomFeatures();
  },
  methods: {
    goToNew() {
      this.$router.push(
        "/game/" +
          this.$route.params.scenarioKey +
          "/gameManagement/equipment/tools/new",
        () => {}
      );
    },
    getCustomFeatures() {
      var targetURL =
        "api/v1/scenario/" + this.$store.getters.getScenarioKey + "/tool";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: ""
          }
        })
        .then(response => {
          var resp = response.data;
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].scenarioKey !== null) {
              this.featureList.push(resp[i].name);
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
    },
    showFeatureDialog(name) {
      var targetURL =
        "api/v1/scenario/" + this.$store.getters.getScenarioKey + "/tool";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: name
          }
        })
        .then(response => {
          this.name = response.data[0].name;
          this.description = response.data[0].description;
          this.cost = response.data[0].cost;
          this.category = response.data[0].category;
          this.weight = response.data[0].weight;
          this.dialog = true;
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    showDeleteDialog(featureName, index) {
      this.indexToDelete = index;
      this.nameToDelete = featureName;
      this.confirm = true;
    },
    deleteFeature(featureName, index) {
      var targetURL =
        "api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/tool/" +
        featureName;
      axios
        .delete(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
        })
        .then(() => {
          this.featureList.splice(index, 1);
        })
        .catch(error => {
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
      this.closeDialog();
      notifications.methods.sendSuccessNotification("Deleted feature");
    },
    editFeature(feature) {
      this.$router.push(
        "/game/" +
          this.$route.params.scenarioKey +
          "/gameManagement/equipment/tools/" +
          feature,
        () => {}
      );
    },
    closeDialog() {
      this.indexToDelete = 0;
      this.nameToDelete = "";
    }
  }
};
</script>
