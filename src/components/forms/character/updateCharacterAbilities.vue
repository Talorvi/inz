<template>
  <div>
    <template>
      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 1600px">
          <q-card>
            <div class="q-pa-md" style="max-width: 16000px">
              <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                <h4>Character: {{ abilities.name }}</h4>
                <q-card>
                  <q-card-section>
                    <h4> Selected Features</h4>
                    <div v-if="abilities.features.length === 0">
                      <h4 >No features added yet</h4>
                    </div>
                    <q-list bordered separator class="q-mt-md"                         v-else>
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
                      Search feature
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
      this.$store.dispatch("updateCharacterGeneralInfo", {
        general: this.general,
        scenarioKey: this.$store.getters.getScenarioKey
      });
    },
    onReset() {
      this.general = {
        name: "",
        race: "",
        class: "",
        level: 1,
        background: "",
        experience: 0,
        alignment: "",
        attributes: {
          strength: 0,
          dexterity: 0,
          constitution: 0,
          intelligence: 0,
          wisdom: 0,
          charisma: 0
        },
        proficiency: "",
        passivePerception: 0,
        inspiration: 0,
        hitPoints: {
          current: 0,
          max: 1,
          temporary: 0
        },
        hitDice: {
          total: 0,
          used: 0
        },
        initiative: 0,
        speed: ""
      };
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
        this.general = {
          name: char.name,
          race: char.race,
          profession: char.profession,
          level: char.level,
          background: char.background,
          experience: char.experience,
          alignment: char.alignment,
          attributes: {
            strength: char.attributes.strength,
            dexterity: char.attributes.dexterity,
            constitution: char.attributes.constitution,
            intelligence: char.attributes.intelligence,
            wisdom: char.attributes.wisdom,
            charisma: char.attributes.charisma
          },
          proficiency: char.proficiency,
          passivePerception: char.passivePerception,
          passiveInsight: char.passiveInsight,
          inspiration: char.inspiration,
          health: {
            actualHealth: char.health.actualHealth,
            maxHealth: char.health.maxHealth,
            temporaryHealth: char.health.temporaryHealth
          },
          hitDices: {
            dice: char.hitDices.dice,
            total: char.hitDices.total,
            used: char.hitDices.used
          },
          initiative: char.initiative,
          speed: char.speed
        };
      } else {
        notifications.methods.sendErrorNotification(
          "Haven't found character " + characterName
        );
      }
    },

    deleteFeature(index, featureName) {
      this.abilities.features.splice(index, 1);
      if(this.featuresFoundBase.includes(featureName)){
        this.featuresFound.push(featureName);
      }
    },
    deleteSearchedFeature(index){
      this.featuresFound.splice(index, 1);
    },
    addFeature(index, featureName) {
      if(this.abilities.features.includes(featureName) === false){
        this.abilities.features.push(featureName);
        this.deleteSearchedFeature(index);
      }else{
        notifications.methods.sendErrorNotification("Cannot add duplicate feature");
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
          if(resp.length === 0){
            notifications.methods.sendErrorNotification("No features found");
          }
          for (var i = 0; i < resp.length; i++) {
            this.featuresFoundBase.push(stringFunc.methods.capitalizeFirstLetter(resp[i].name));
            if(this.abilities.features.includes(resp[i].name) === false && resp[i].visible === true){
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
    }
  }
};
</script>
