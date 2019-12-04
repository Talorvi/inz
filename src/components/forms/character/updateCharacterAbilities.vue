<template>
  <div>
    <template>
      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 1600px">
          <q-card>
            <div class="q-pa-md" style="max-width: 16000px">
              <q-form @submit="onSubmit" class="q-gutter-md">
                <h4>Character: {{ abilities.name }}</h4>
                <q-card>
                  <q-card-section>
                    <h4>Selected Features</h4>
                    <div v-if="abilities.features.length === 0">
                      <h4>No features added yet</h4>
                    </div>
                    <q-list bordered separator class="q-mt-md" v-else>
                      <q-item
                        v-ripple
                        active-class="bg-teal-1"
                        v-for="(feature, index) in abilities.features"
                      >
                        <q-item-section>
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
                      Search spell
                    </q-btn>
                    <div v-if="featuresFound.length === 0">
                      <h4>No Results Found</h4>
                    </div>
                    <q-list bordered separator class="q-mt-md" v-else>
                      <q-item
                        v-ripple
                        active-class="bg-teal-1"
                        v-for="(featureFound, index) in featuresFound"
                      >
                        <q-item-section>
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
                <q-card>
                  <q-card-section>
                    <h4>Selected Languages</h4>
                    <div v-if="abilities.languages.length === 0">
                      <h4>No languages added yet</h4>
                    </div>
                    <q-list bordered separator class="q-mt-md" v-else>
                      <q-item
                        v-ripple
                        active-class="bg-teal-1"
                        v-for="(language, index) in abilities.languages"
                      >
                        <q-item-section>
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
                      <h4>No Results Found</h4>
                    </div>
                    <q-list bordered separator class="q-mt-md" v-else>
                      <q-item
                        v-ripple
                        active-class="bg-teal-1"
                        v-for="(languageFound, index) in languagesFound"
                      >
                        <q-item-section>
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
                <q-card>
                  <q-card-section>
                    <h4>Selected Traits</h4>
                    <div v-if="abilities.traits.length === 0">
                      <h4>No traits added yet</h4>
                    </div>
                    <q-list bordered separator class="q-mt-md" v-else>
                      <q-item
                        v-ripple
                        active-class="bg-teal-1"
                        v-for="(trait, index) in abilities.traits"
                      >
                        <q-item-section>
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
                      <h4>No Results Found</h4>
                    </div>
                    <q-list bordered separator class="q-mt-md" v-else>
                      <q-item
                        v-ripple
                        active-class="bg-teal-1"
                        v-for="(traitFound, index) in traitsFound"
                      >
                        <q-item-section>
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
                <q-card>
                  <q-card-section>
                    <h4>Selected Proficiencies</h4>
                    <div v-if="abilities.proficiencies.length === 0">
                      <h4>No proficiencies added yet</h4>
                    </div>
                    <q-list bordered separator class="q-mt-md" v-else>
                      <q-item
                        v-ripple
                        active-class="bg-teal-1"
                        v-for="(proficiency, index) in abilities.proficiencies"
                      >
                        <q-item-section>
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
                      <h4>No Results Found</h4>
                    </div>
                    <q-list bordered separator class="q-mt-md" v-else>
                      <q-item
                        v-ripple
                        active-class="bg-teal-1"
                        v-for="(proficiencyFound, index) in proficienciesFound"
                      >
                        <q-item-section>
                          <q-item-label>{{ proficiencyFound }}</q-item-label>
                        </q-item-section>
                        <q-btn
                          size="12px"
                          flat
                          dense
                          round
                          icon="add"
                          v-on:click="addProficiency(index, proficiencyFound)"
                        />
                      </q-item>
                    </q-list>
                  </q-card-section>
                </q-card>
                <q-btn label="Submit" type="submit" color="primary" />
              </q-form>
            </div>
          </q-card>
        </div>
      </div>
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
    var char = this.getCharacterByName(this.$route.params.charName);
  },
  methods: {
    onSubmit() {
      var abilitiesOnlyNames = {
        name: this.abilities.name,
        features: [],
        languages: [],
        proficiencies: [],
        traits: []
      };

      this.abilities.features.forEach(function(item) {
        abilitiesOnlyNames.features.push(item.name);
      });
      this.abilities.languages.forEach(function(item) {
        abilitiesOnlyNames.languages.push(item.name);
      });
      this.abilities.proficiencies.forEach(function(item) {
        abilitiesOnlyNames.proficiencies.push(item.name);
      });
      this.abilities.traits.forEach(function(item) {
        abilitiesOnlyNames.traits.push(item.name);
      });
      this.$store.dispatch("updateCharacterAbilities", {
        abilities: abilitiesOnlyNames,
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
        notifications.methods.sendSuccessNotification(char.name);
        notifications.methods.sendSuccessNotification(
          char.features === undefined ? "dupa" : char.features
        );
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
      notifications.methods.sendSuccessNotification(featureName);
      var targetURL =
        "api/api/v1/scenario/" +
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
      notifications.methods.sendSuccessNotification(languageName);
      var targetURL =
        "api/api/v1/scenario/" +
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
      notifications.methods.sendSuccessNotification(traitName);
      var targetURL =
        "api/api/v1/scenario/" + this.$store.getters.getScenarioKey + "/trait";
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
      notifications.methods.sendSuccessNotification(proficiencyName);
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
    },
  }
};
</script>
