<template>
  <div class="text-center">
    <div v-if="spell.scenarioKey === null">
      <h5>This spell cannot be edited</h5>
      <h5>Name: {{ spell.name }}</h5>
      <h5>Level: {{ spell.level }}</h5>
      <h5>Magic School: {{ spell.magicSchool }}</h5>
      <h5>Range: {{ spell.range }}</h5>
      <h5>Duration: {{ spell.duration }}</h5>
      <h5>Casting Time: {{ spell.castingTime }}</h5>
      <h5>Concentration: {{ spell.concentration }}</h5>
      <h5>Components: {{ spell.components }}</h5>
      <h5>Material: {{ spell.material }}</h5>
      <h5>Ritual: {{ spell.ritual }}</h5>
      <p>Higher Levels: {{ spell.higherLevels }}</p>
      <p>Description: {{ spell.description }}</p>
    </div>
    <q-form
      @submit="createFeature"
      @reset="onReset"
      class="q-gutter-md"
      v-else-if="spellName === 'new'"
    >
      <q-input filled label="Name" :rules="[]" v-model="spell.name" />
      <q-input filled label="Level" type="number" :rules="[]" v-model="spell.level" />
      <q-input filled label="Magic School" :rules="[]" v-model="spell.magicSchool" />
      <q-input filled label="Range" :rules="[]" v-model="spell.range" />
      <q-input filled label="Duration" :rules="[]" v-model="spell.duration" />
      <q-input filled label="Casting Time" :rules="[]" v-model="spell.castingTime" />
      <q-toggle color="green" label="Concentration" v-model="spell.concentration" />
      <q-input filled label="Components" :rules="[]" v-model="spell.components" />
      <q-input filled label="Material" :rules="[]" v-model="spell.material" />
      <q-toggle color="green" label="Ritual" v-model="spell.ritual" />
      <q-input filled label="Higher Levels" :rules="[]" v-model="spell.higherLevels" />
      <q-input filled label="Description" :rules="[]" v-model="spell.description" />
      <q-toggle color="green" label="Visible" v-model="spell.visible" />
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
      v-else-if="spellName !== 'new' && searchResultFound === true"
    >
      <h5>Spell: {{ spell.name }}</h5>
      <q-input filled label="Level" type="number" :rules="[]" v-model="spell.level" />
      <q-input filled label="Magic School" :rules="[]" v-model="spell.magicSchool" />
      <q-input filled label="Range" :rules="[]" v-model="spell.range" />
      <q-input filled label="Duration" :rules="[]" v-model="spell.duration" />
      <q-input filled label="Casting Time" :rules="[]" v-model="spell.castingTime" />
      <q-toggle color="green" label="Concentration" v-model="spell.concentration" />
      <q-input filled label="Components" :rules="[]" v-model="spell.components" />
      <q-input filled label="Material" :rules="[]" v-model="spell.material" />
      <q-toggle color="green" label="Ritual" v-model="spell.ritual" />
      <q-input filled label="Higher Levels" :rules="[]" v-model="spell.higherLevels" />
      <q-input filled label="Description" :rules="[]" v-model="spell.description" />
      <q-toggle color="green" label="Visible" v-model="spell.visible" />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
    <div v-else>
      <h5>Haven't found spell with name: {{ spellName }}.</h5>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import notifications from "../../../functions/notifications";
export default {
  data() {
    return {
      spellName: "",
      spell: {
        castingTime: "",
        components: "",
        concentration: false,
        description: "",
        duration: "",
        higherLevels: "",
        level: 0,
        magicSchool: "",
        material: "",
        name: "",
        range: "",
        ritual: false,
        visible: false
      },
      searchResultFound: false
    };
  },
  mounted() {
    this.spellName = this.$route.params.spellName;
    if (this.spellName !== "new") {
      this.getExactFeatureByName(this.spellName);
    }
    //new -> no fill to fields, submit creates a new one
    //existing -> fill fields, name cannot be changed , submit patch existing one
    //not new and not existing -> 404!
  },
  methods: {
    createFeature() {
      var targetURL =
        "api/api/v1/scenario/" + this.$store.getters.getScenarioKey + "/spell";
      axios
        .post(
          targetURL,
          {
            castingTime: this.spell.castingTime,
            components: this.spell.components,
            concentration: this.spell.concentration,
            description: this.spell.description,
            duration: this.spell.duration,
            higherLevels: this.spell.higherLevels,
            level: this.spell.level,
            magicSchool: this.spell.magicSchool,
            material: this.spell.material,
            name: this.spell.name,
            range: this.spell.range,
            ritual: this.spell.ritual,
            visible: this.spell.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully created Spell"
          );
          this.spell.castingTime = "";
          this.spell.components = "";
          this.spell.concentration = false;
          this.spell.description = "";
          this.spell.duration = "";
          this.spell.higherLevels = "";
          this.spell.level = 0;
          this.spell.magicSchool = "";
          this.spell.material = "";
          this.spell.name = "";
          this.spell.range = "";
          this.spell.ritual = false;
          this.spell.visible = false;
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
        "/spell";
      axios
        .patch(
          targetURL,
          {
            castingTime: this.spell.castingTime,
            components: this.spell.components,
            concentration: this.spell.concentration,
            description: this.spell.description,
            duration: this.spell.duration,
            higherLevels: this.spell.higherLevels,
            level: this.spell.level,
            magicSchool: this.spell.magicSchool,
            material: this.spell.material,
            name: this.spell.name,
            range: this.spell.range,
            ritual: this.spell.ritual,
            visible: this.spell.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully updated Spell"
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
      this.spell.castingTime = "";
      this.spell.components = "";
      this.spell.concentration = false;
      this.spell.description = "";
      this.spell.duration = "";
      this.spell.higherLevels = "";
      this.spell.level = 0;
      this.spell.magicSchool = "";
      this.spell.material = "";
      this.spell.name = "";
      this.spell.range = "";
      this.spell.ritual = false;
      this.spell.visible = false;
    },
    getExactFeatureByName(spellName) {
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/spell";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: spellName
          }
        })
        .then(response => {
          var resp = response.data;
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].name.toLowerCase() === spellName.toLowerCase()) {
              this.spell = resp[i];
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
