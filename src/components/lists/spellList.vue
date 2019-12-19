<template>
  <div>
    <q-list bordered separator class="q-mt-md">
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
          color="black"
          v-on:click="editFeature(feature)"
        />
        <q-item-section side>
          <q-btn
            size="12px"
            flat
            dense
            round
            icon="delete"
            color="black"
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
        <q-card-section> <b>Level: </b> {{ level }} </q-card-section>
        <q-card-section> <b>Magic School: </b> {{ magicSchool }} </q-card-section>
        <q-card-section> <b>Material :</b> {{ material }} </q-card-section>
        <q-card-section> <b>Range: </b> {{ range }} </q-card-section>
        <q-card-section> <b>Casting time: </b> {{ castingTime }} </q-card-section>
        <q-card-section> <b>Duration:</b> {{ duration }} </q-card-section>
        <q-card-section> <b>Components :</b> {{ components }} </q-card-section>
        <q-card-section> <b>Concentration: </b> {{ concentration ? "Yes" : "No" }} </q-card-section>
        <q-card-section> <b>Ritual: </b> {{ ritual ? "Yes" : "No" }} </q-card-section>
        <q-card-section> <b>Description:</b> {{ description }} </q-card-section>
        <q-card-section> <b>Higher Levels:</b> {{ higherLevels }} </q-card-section>
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
      castingTime: "",
      components: "",
      concentration: false,
      duration: "",
      higherLevels: "",
      level: 0,
      magicSchool: "",
      material: "",
      range: "",
      ritual: false,

      confirm: false,
      indexToDelete: 0,
      nameToDelete: ""
    };
  },
  mounted() {
    this.getCustomFeatures();
  },
  methods: {
    getCustomFeatures() {
      var targetURL =
        "api/api/v1/scenario/" + this.$store.getters.getScenarioKey + "/spell";
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
        "api/api/v1/scenario/" + this.$store.getters.getScenarioKey + "/spell";
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
          this.castingTime = response.data[0].castingTime;
          this.components = response.data[0].components;
          this.concentration = response.data[0].concentration;
          this.duration = response.data[0].duration;
          this.higherLevels = response.data[0].higherLevels;
          this.level = response.data[0].level;
          this.magicSchool = response.data[0].magicSchool;
          this.material = response.data[0].material;
          this.range = response.data[0].range;
          this.ritual = response.data[0].ritual;
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
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/spell/" +
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
      console.log(feature);
      //tutaj router push
    },
    closeDialog() {
      this.indexToDelete = 0;
      this.nameToDelete = "";
    }
  }
};
</script>
