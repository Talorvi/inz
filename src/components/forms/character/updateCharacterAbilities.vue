<template>
  <div>
    <template>
      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 1600px">
          <q-card>
            <div class="q-pa-md" style="max-width: 16000px">
              <q-form @submit="onSubmit" class="q-gutter-md">
                <h5>Character: {{ abilities.name }}</h5>
                <q-tabs
                  v-model="tab"
                  dense
                  class="text-grey"
                  active-color="accent"
                  indicator-color="accent"
                  align="justify"
                  narrow-indicator
                >
                  <q-tab
                    name="features"
                    icon="fas fa-khanda"
                    label="Features"
                  />
                  <q-tab
                    name="languages"
                    icon="fas fa-shield-alt"
                    label="Languages"
                  />
                  <q-tab name="traits" icon="fas fa-cog" label="Traits" />
                  <q-tab
                    name="proficiencies"
                    icon="fas fa-hammer"
                    label="Proficiencies"
                  />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                  <q-tab-panel name="features">
                    <q-card class="col-xs-12 q-mb-md">
                      <q-card-section>
                        <h5>Selected Features</h5>
                        <div v-if="abilities.features.length === 0">
                          <h5>No features added yet</h5>
                        </div>
                        <q-list bordered separator class="q-mt-md" v-else>
                          <q-item
                            v-ripple
                            active-class="bg-teal-1"
                            v-for="(feature, index) in abilities.features"
                          >
                            <q-item-section @click="showFeatureDialog(feature)">
                              <q-item-label>{{ feature }}</q-item-label>
                            </q-item-section>
                            <q-btn
                              size="12px"
                              flat
                              dense
                              round
                              icon="delete"
                              v-on:click="deleteFeature(index, feature)"
                            />
                          </q-item>
                        </q-list>
                      </q-card-section>
                      <q-card-section>
                        <q-input
                          filled
                          label="Feature"
                          :rules="[]"
                          v-model="newFeature"
                        />
                        <q-btn v-on:click="searchFeature(newFeature)">
                          Search feature
                        </q-btn>
                        <div v-if="featuresFound.length === 0">
                          <h5>No Results Found</h5>
                        </div>
                        <q-list bordered separator class="q-mt-md" v-else>
                          <q-item
                            v-ripple
                            active-class="bg-teal-1"
                            v-for="(featureFound, index) in featuresFound"
                          >
                            <q-item-section
                              @click="showFeatureDialog(featureFound)"
                            >
                              <q-item-label>{{ featureFound }}</q-item-label>
                            </q-item-section>
                            <q-btn
                              size="12px"
                              flat
                              dense
                              round
                              icon="add"
                              v-on:click="addFeature(index, featureFound)"
                            />
                          </q-item>
                        </q-list>
                      </q-card-section>
                    </q-card>
                  </q-tab-panel>
                  <q-tab-panel name="languages">
                    <q-card class="col-xs-12 q-mb-md">
                      <q-card-section>
                        <h5>Selected Languages</h5>
                        <div v-if="abilities.languages.length === 0">
                          <h5>No languages added yet</h5>
                        </div>
                        <q-list bordered separator class="q-mt-md" v-else>
                          <q-item
                            v-ripple
                            active-class="bg-teal-1"
                            v-for="(language, index) in abilities.languages"
                          >
                            <q-item-section
                              @click="showLanguageDialog(language)"
                            >
                              <q-item-label>{{ language }}</q-item-label>
                            </q-item-section>
                            <q-btn
                              size="12px"
                              flat
                              dense
                              round
                              icon="delete"
                              v-on:click="deleteLanguage(index, language)"
                            />
                          </q-item>
                        </q-list>
                      </q-card-section>
                      <q-card-section>
                        <q-input
                          filled
                          label="Language"
                          :rules="[]"
                          v-model="newLanguage"
                        />
                        <q-btn v-on:click="searchLanguage(newLanguage)">
                          Search language
                        </q-btn>
                        <div v-if="languagesFound.length === 0">
                          <h5>No Results Found</h5>
                        </div>
                        <q-list bordered separator class="q-mt-md" v-else>
                          <q-item
                            v-ripple
                            active-class="bg-teal-1"
                            v-for="(languageFound, index) in languagesFound"
                          >
                            <q-item-section
                              @click="showLanguageDialog(languageFound)"
                            >
                              <q-item-label>{{ languageFound }}</q-item-label>
                            </q-item-section>
                            <q-btn
                              size="12px"
                              flat
                              dense
                              round
                              icon="add"
                              v-on:click="addLanguage(index, languageFound)"
                            />
                          </q-item>
                        </q-list>
                      </q-card-section>
                    </q-card>
                  </q-tab-panel>
                  <q-tab-panel name="traits">
                    <q-card class="col-xs-12 q-mb-md">
                      <q-card-section>
                        <h5>Selected Traits</h5>
                        <div v-if="abilities.traits.length === 0">
                          <h5>No traits added yet</h5>
                        </div>
                        <q-list bordered separator class="q-mt-md" v-else>
                          <q-item
                            v-ripple
                            active-class="bg-teal-1"
                            v-for="(trait, index) in abilities.traits"
                          >
                            <q-item-section @click="showTraitDialog(trait)">
                              <q-item-label>{{ trait }}</q-item-label>
                            </q-item-section>
                            <q-btn
                              size="12px"
                              flat
                              dense
                              round
                              icon="delete"
                              v-on:click="deleteTrait(index, trait)"
                            />
                          </q-item>
                        </q-list>
                      </q-card-section>
                      <q-card-section>
                        <q-input
                          filled
                          label="Trait"
                          :rules="[]"
                          v-model="newTrait"
                        />
                        <q-btn v-on:click="searchTrait(newTrait)">
                          Search Trait
                        </q-btn>
                        <div v-if="traitsFound.length === 0">
                          <h5>No Results Found</h5>
                        </div>
                        <q-list bordered separator class="q-mt-md" v-else>
                          <q-item
                            v-ripple
                            active-class="bg-teal-1"
                            v-for="(traitFound, index) in traitsFound"
                          >
                            <q-item-section
                              @click="showTraitDialog(traitFound)"
                            >
                              <q-item-label>{{ traitFound }}</q-item-label>
                            </q-item-section>
                            <q-btn
                              size="12px"
                              flat
                              dense
                              round
                              icon="add"
                              v-on:click="addTrait(index, traitFound)"
                            />
                          </q-item>
                        </q-list>
                      </q-card-section>
                    </q-card>
                  </q-tab-panel>
                  <q-tab-panel name="proficiencies">
                    <q-card class="col-xs-12">
                      <q-card-section>
                        <h5>Selected Proficiencies</h5>
                        <div v-if="abilities.proficiencies.length === 0">
                          <h5>No proficiencies added yet</h5>
                        </div>
                        <q-list bordered separator class="q-mt-md" v-else>
                          <q-item
                            v-ripple
                            active-class="bg-teal-1"
                            v-for="(proficiency,
                            index) in abilities.proficiencies"
                          >
                            <q-item-section @click="showProficiencyDialog(proficiency)">
                              <q-item-label>{{ proficiency }}</q-item-label>
                            </q-item-section>
                            <q-btn
                              size="12px"
                              flat
                              dense
                              round
                              icon="delete"
                              v-on:click="deleteProficiency(index, proficiency)"
                            />
                          </q-item>
                        </q-list>
                      </q-card-section>
                      <q-card-section>
                        <q-input
                          filled
                          label="Proficiency"
                          :rules="[]"
                          v-model="newProficiency"
                        />
                        <q-btn v-on:click="searchProficiency(newProficiency)">
                          Search Proficiency
                        </q-btn>
                        <div v-if="proficienciesFound.length === 0">
                          <h5>No Results Found</h5>
                        </div>
                        <q-list bordered separator class="q-mt-md" v-else>
                          <q-item
                            v-ripple
                            active-class="bg-teal-1"
                            v-for="(proficiencyFound,
                            index) in proficienciesFound"
                          >
                            <q-item-section @click="showProficiencyDialog(proficiencyFound)">
                              <q-item-label>{{
                                proficiencyFound
                              }}</q-item-label>
                            </q-item-section>
                            <q-btn
                              size="12px"
                              flat
                              dense
                              round
                              icon="add"
                              v-on:click="
                                addProficiency(index, proficiencyFound)
                              "
                            />
                          </q-item>
                        </q-list>
                      </q-card-section>
                    </q-card>
                  </q-tab-panel>
                </q-tab-panels>
                <q-btn size="lg" label="Submit" type="submit" color="accent" />
              </q-form>
            </div>
          </q-card>
        </div>
      </div>

      <q-dialog v-model="dialog">
        <q-card>
          <q-card-section class="row items-center">
            <div class="text-h6">{{ name }}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section>
            {{ description }}
          </q-card-section>
        </q-card>
      </q-dialog>
    </template>
  </div>
</template>

<script>
import notifications from "../../../functions/notifications";
import stringFunc from "../../../functions/stringFunctions";
import axios from "axios";

export default {
  data() {
    return {
      dialog: false,
      name: "",
      description: "",
      tab: "features",

      featuresFound: [],
      featuresFoundBase: [],
      newFeature: "",

      languagesFound: [],
      languagesFoundBase: [],
      newLanguage: "",

      traitsFound: [],
      traitsFoundBase: [],
      newTrait: "",

      proficienciesFound: [],
      proficienciesFoundBase: [],
      newProficiency: "",
      abilities: {
        name: "",
        features: [],
        languages: [],
        proficiencies: [],
        traits: []
      },
      characterName: "general"
    };
  },
  mounted() {
    this.characterName = this.$route.params.charName;
    this.getCharacterByName(this.characterName);
  },
  methods: {
    showFeatureDialog(name) {
      var targetURL =
        "api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/feature?name=" +
        name;
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
        })
        .then(response => {
          this.name = response.data[0].name;
          this.description = response.data[0].description;
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
    showLanguageDialog(name) {
      var targetURL =
        "api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/language?name=" +
        name;
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
        })
        .then(response => {
          this.name = response.data[0].name;
          this.description =
            response.data[0].type + " | Script: " + response.data[0].script;
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
    showTraitDialog(name) {
      var targetURL =
        "api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/trait?name=" +
        name;
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
        })
        .then(response => {
          this.name = response.data[0].name;
          this.description = response.data[0].description;
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
    showProficiencyDialog(name) {
      var targetURL =
        "api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/proficiency?name=" +
        name;
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
        })
        .then(response => {
          this.name = response.data[0].name;
          this.description = response.data[0].type;
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
    onSubmit() {
      this.$store.dispatch("updateCharacterAbilities", {
        abilities: this.abilities,
        scenarioKey: this.$store.getters.getScenarioKey
      });
    },
    getCharacterByName(characterName) {
      var char = null;
      var characters = this.$store.getters.getCharacters;
      for (var i = 0; i < characters.length; i++) {
        if (characters[i].name === characterName) {
          char = characters[i];
        }
      }
      if (char !== null) {
        this.abilities = {
          name: char.name,
          features: char.abilities.features,
          languages: char.abilities.languages,
          proficiencies: char.abilities.proficiencies,
          traits: char.abilities.traits
        };
      } else {
        notifications.methods.sendErrorNotification(
          "Haven't found character " + characterName
        );
      }
    },

    deleteFeature(index, featureName) {
      this.abilities.features.splice(index, 1);
      if (this.featuresFoundBase.includes(featureName)) {
        this.featuresFound.push(featureName);
      }
    },
    deleteSearchedFeature(index) {
      this.featuresFound.splice(index, 1);
    },
    addFeature(index, featureName) {
      if (this.abilities.features.includes(featureName) === false) {
        this.abilities.features.push(featureName);
        this.deleteSearchedFeature(index);
      } else {
        notifications.methods.sendErrorNotification(
          "Cannot add duplicate feature"
        );
      }
    },
    searchFeature(featureName) {
      var targetURL =
        "api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/feature";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: featureName
          }
        })
        .then(response => {
          this.featuresFound = [];
          var resp = response.data;
          this.featuresFoundBase = [];
          if (resp.length === 0) {
            notifications.methods.sendErrorNotification("No features found");
          }
          for (var i = 0; i < resp.length; i++) {
            this.featuresFoundBase.push(
              stringFunc.methods.capitalizeFirstLetter(resp[i].name)
            );
            if (
              this.abilities.features.includes(resp[i].name) === false &&
              resp[i].visible === true
            ) {
              this.featuresFound.push(
                stringFunc.methods.capitalizeFirstLetter(resp[i].name)
              );
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

    deleteLanguage(index, languageName) {
      this.abilities.languages.splice(index, 1);
      if (this.languagesFoundBase.includes(languageName)) {
        this.languagesFound.push(languageName);
      }
    },
    deleteSearchedLanguage(index) {
      this.languagesFound.splice(index, 1);
    },
    addLanguage(index, languageName) {
      if (this.abilities.languages.includes(languageName) === false) {
        this.abilities.languages.push(languageName);
        this.deleteSearchedLanguage(index);
      } else {
        notifications.methods.sendErrorNotification(
          "Cannot add duplicate language"
        );
      }
    },
    searchLanguage(languageName) {
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
          this.languagesFound = [];
          var resp = response.data;
          this.languagesFoundBase = [];
          if (resp.length === 0) {
            notifications.methods.sendErrorNotification("No features found");
          }
          for (var i = 0; i < resp.length; i++) {
            this.languagesFoundBase.push(
              stringFunc.methods.capitalizeFirstLetter(resp[i].name)
            );
            if (
              this.abilities.languages.includes(resp[i].name) === false &&
              resp[i].visible === true
            ) {
              this.languagesFound.push(
                stringFunc.methods.capitalizeFirstLetter(resp[i].name)
              );
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

    deleteTrait(index, traitName) {
      this.abilities.traits.splice(index, 1);
      if (this.traitsFoundBase.includes(traitName)) {
        this.traitsFound.push(traitName);
      }
    },
    deleteSearchedTrait(index) {
      this.traitsFound.splice(index, 1);
    },
    addTrait(index, traitName) {
      if (this.abilities.traits.includes(traitName) === false) {
        this.abilities.traits.push(traitName);
        this.deleteSearchedTrait(index);
      } else {
        notifications.methods.sendErrorNotification(
          "Cannot add duplicate trait"
        );
      }
    },
    searchTrait(traitName) {
      var targetURL =
        "api/v1/scenario/" + this.$store.getters.getScenarioKey + "/trait";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: traitName
          }
        })
        .then(response => {
          this.traitsFound = [];
          var resp = response.data;
          this.traitsFoundBase = [];
          if (resp.length === 0) {
            notifications.methods.sendErrorNotification("No traits found");
          }
          for (var i = 0; i < resp.length; i++) {
            this.traitsFoundBase.push(
              stringFunc.methods.capitalizeFirstLetter(resp[i].name)
            );
            if (
              this.abilities.traits.includes(resp[i].name) === false &&
              resp[i].visible === true
            ) {
              this.traitsFound.push(
                stringFunc.methods.capitalizeFirstLetter(resp[i].name)
              );
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

    deleteProficiency(index, proficiencyName) {
      this.abilities.proficiencies.splice(index, 1);
      if (this.proficienciesFoundBase.includes(proficiencyName)) {
        this.proficienciesFound.push(proficiencyName);
      }
    },
    deleteSearchedProficiency(index) {
      this.proficienciesFound.splice(index, 1);
    },
    addProficiency(index, proficiencyName) {
      if (this.abilities.proficiencies.includes(proficiencyName) === false) {
        this.abilities.proficiencies.push(proficiencyName);
        this.deleteSearchedProficiency(index);
      } else {
        notifications.methods.sendErrorNotification(
          "Cannot add duplicate proficiency"
        );
      }
    },
    searchProficiency(proficiencyName) {
      var targetURL =
        "api/v1/scenario/" +
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
          this.proficienciesFound = [];
          var resp = response.data;
          this.proficienciesFoundBase = [];
          if (resp.length === 0) {
            notifications.methods.sendErrorNotification("No features found");
          }
          for (var i = 0; i < resp.length; i++) {
            this.proficienciesFoundBase.push(
              stringFunc.methods.capitalizeFirstLetter(resp[i].name)
            );
            if (
              this.abilities.proficiencies.includes(resp[i].name) === false &&
              resp[i].visible === true
            ) {
              this.proficienciesFound.push(
                stringFunc.methods.capitalizeFirstLetter(resp[i].name)
              );
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
