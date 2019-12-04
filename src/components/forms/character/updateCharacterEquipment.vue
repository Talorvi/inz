<template>
  <div>
    <template>
      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 1600px">
          <q-card>
            <div class="q-pa-md" style="max-width: 16000px">
              <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                <h4>Character: {{ equipment.name }}</h4>
                <q-input
                  filled
                  v-model="equipment.armorClass"
                  label="Armor Class"
                  type="number"
                />
                <h4>Currency:</h4>
                <div class="row no-wrap">
                  <q-input
                    filled
                    v-model="equipment.currency.cp"
                    label="Copper Piece"
                    type="number"
                  />
                  <q-input
                    filled
                    v-model="equipment.currency.sp"
                    label="Silver Piece"
                    type="number"
                  />
                  <q-input
                    filled
                    v-model="equipment.currency.ep"
                    label="Electrum Piece"
                    type="number"
                  />
                  <q-input
                    filled
                    v-model="equipment.currency.gp"
                    label="Gold Piece"
                    type="number"
                  />
                  <q-input
                    filled
                    v-model="equipment.currency.pp"
                    label="Platinium Piece"
                    type="number"
                  />

                </div>
                <q-card>
                  <q-card-section>
                    <h4> Selected Armors</h4>
                    <div v-if="equipment.armors.length === 0">
                      <h4 >No armor added yet</h4>
                    </div>
                    <q-list bordered separator class="q-mt-md" v-else>
                      <q-expansion-item
                        expand-separator
                        label="Armor name"
                      >
                        <q-separator />
                        <q-card>
                          <q-card-section>
                            Description: description Description: descriptionDescription: descriptionDescription: descriptionDescription: description
                          </q-card-section>
                          <q-card-section>
                            <q-btn
                              v-on:click=""
                            >
                              Remove
                            </q-btn>

                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-item
                        v-ripple
                        active-class="bg-teal-1"
                        v-for="(armor, index) in equipment.armors"
                      >
                        <q-item-section>
                          <q-item-label>{{ armor }}</q-item-label>
                        </q-item-section>
                        <q-btn
                          size="12px"
                          flat
                          dense
                          round
                          icon="delete"
                          v-on:click="deleteFeature(index, armor)"
                        />
                      </q-item>
                    </q-list>
                  </q-card-section>
                  <q-card-section>
                    <q-input
                      filled
                      label="Armor"
                      :rules="[]"
                      v-model="newArmor"
                    />
                    <q-btn v-on:click="searchFeature(newArmor)">
                      Search Armor
                    </q-btn>
                    <q-expansion-item
                      expand-separator
                      label="Feature name"
                    >
                      <q-card>
                        <q-card-section>
                          Description: description Description: descriptionDescription: descriptionDescription: descriptionDescription: description
                        </q-card-section>
                        <q-card-section>
                          <q-btn
                            v-on:click=""
                          >
                            Add
                          </q-btn>

                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                    <div v-if="armorsFound.length === 0">
                      <h4>No Results Found</h4>
                    </div>
                    <q-list bordered separator class="q-mt-md" v-else>
                      <q-item
                        v-ripple
                        active-class="bg-teal-1"
                        v-for="(armorFound, index) in armorsFound"
                      >
                        <q-item-section>
                          <q-item-label>{{ armorFound }}</q-item-label>
                        </q-item-section>
                        <q-btn
                          size="12px"
                          flat
                          dense
                          round
                          icon="add"
                          v-on:click="addFeature(index, armorFound)"
                        />
                      </q-item>
                    </q-list>
                  </q-card-section>
                </q-card>
                <q-card>
                  <q-card-section>
                    <h4> Selected Armors</h4>
                    <div v-if="equipment.armors.length === 0">
                      <h4 >No armor added yet</h4>
                    </div>
                    <q-list bordered separator class="q-mt-md" v-else>
                      <q-expansion-item
                        expand-separator
                        label="Armor name"
                      >
                        <q-separator />
                        <q-card>
                          <q-card-section>
                            Description: description Description: descriptionDescription: descriptionDescription: descriptionDescription: description
                          </q-card-section>
                          <q-card-section>
                            <q-btn
                              v-on:click=""
                            >
                              Remove
                            </q-btn>

                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-item
                        v-ripple
                        active-class="bg-teal-1"
                        v-for="(armor, index) in equipment.armors"
                      >
                        <q-item-section>
                          <q-item-label>{{ armor }}</q-item-label>
                        </q-item-section>
                        <q-btn
                          size="12px"
                          flat
                          dense
                          round
                          icon="delete"
                          v-on:click="deleteFeature(index, armor)"
                        />
                      </q-item>
                    </q-list>
                  </q-card-section>
                  <q-card-section>
                    <q-input
                      filled
                      label="Armor"
                      :rules="[]"
                      v-model="newArmor"
                    />
                    <q-btn v-on:click="searchFeature(newArmor)">
                      Search Armor
                    </q-btn>
                    <q-expansion-item
                      expand-separator
                      label="Feature name"
                    >
                      <q-card>
                        <q-card-section>
                          Description: description Description: descriptionDescription: descriptionDescription: descriptionDescription: description
                        </q-card-section>
                        <q-card-section>
                          <q-btn
                            v-on:click=""
                          >
                            Add
                          </q-btn>

                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                    <div v-if="armorsFound.length === 0">
                      <h4>No Results Found</h4>
                    </div>
                    <q-list bordered separator class="q-mt-md" v-else>
                      <q-item
                        v-ripple
                        active-class="bg-teal-1"
                        v-for="(featureFound, index) in spellsFound"
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
                    <h4> Selected Armors</h4>
                    <div v-if="equipment.armors.length === 0">
                      <h4 >No armor added yet</h4>
                    </div>
                    <q-list bordered separator class="q-mt-md" v-else>
                      <q-expansion-item
                        expand-separator
                        label="Armor name"
                      >
                        <q-separator />
                        <q-card>
                          <q-card-section>
                            Description: description Description: descriptionDescription: descriptionDescription: descriptionDescription: description
                          </q-card-section>
                          <q-card-section>
                            <q-btn
                              v-on:click=""
                            >
                              Remove
                            </q-btn>

                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-item
                        v-ripple
                        active-class="bg-teal-1"
                        v-for="(armor, index) in equipment.armors"
                      >
                        <q-item-section>
                          <q-item-label>{{ armor }}</q-item-label>
                        </q-item-section>
                        <q-btn
                          size="12px"
                          flat
                          dense
                          round
                          icon="delete"
                          v-on:click="deleteFeature(index, armor)"
                        />
                      </q-item>
                    </q-list>
                  </q-card-section>
                  <q-card-section>
                    <q-input
                      filled
                      label="Armor"
                      :rules="[]"
                      v-model="newArmor"
                    />
                    <q-btn v-on:click="searchFeature(newArmor)">
                      Search Armor
                    </q-btn>
                    <q-expansion-item
                      expand-separator
                      label="Feature name"
                    >
                      <q-card>
                        <q-card-section>
                          Description: description Description: descriptionDescription: descriptionDescription: descriptionDescription: description
                        </q-card-section>
                        <q-card-section>
                          <q-btn
                            v-on:click=""
                          >
                            Add
                          </q-btn>

                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                    <div v-if="armorsFound.length === 0">
                      <h4>No Results Found</h4>
                    </div>
                    <q-list bordered separator class="q-mt-md" v-else>
                      <q-item
                        v-ripple
                        active-class="bg-teal-1"
                        v-for="(featureFound, index) in spellsFound"
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
                    <h4> Selected Armors</h4>
                    <div v-if="equipment.armors.length === 0">
                      <h4 >No armor added yet</h4>
                    </div>
                    <q-list bordered separator class="q-mt-md" v-else>
                      <q-expansion-item
                        expand-separator
                        label="Armor name"
                      >
                        <q-separator />
                        <q-card>
                          <q-card-section>
                            Description: description Description: descriptionDescription: descriptionDescription: descriptionDescription: description
                          </q-card-section>
                          <q-card-section>
                            <q-btn
                              v-on:click=""
                            >
                              Remove
                            </q-btn>

                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-item
                        v-ripple
                        active-class="bg-teal-1"
                        v-for="(armor, index) in equipment.armors"
                      >
                        <q-item-section>
                          <q-item-label>{{ armor }}</q-item-label>
                        </q-item-section>
                        <q-btn
                          size="12px"
                          flat
                          dense
                          round
                          icon="delete"
                          v-on:click="deleteFeature(index, armor)"
                        />
                      </q-item>
                    </q-list>
                  </q-card-section>
                  <q-card-section>
                    <q-input
                      filled
                      label="Armor"
                      :rules="[]"
                      v-model="newArmor"
                    />
                    <q-btn v-on:click="searchFeature(newArmor)">
                      Search Armor
                    </q-btn>
                    <q-expansion-item
                      expand-separator
                      label="Feature name"
                    >
                      <q-card>
                        <q-card-section>
                          Description: description Description: descriptionDescription: descriptionDescription: descriptionDescription: description
                        </q-card-section>
                        <q-card-section>
                          <q-btn
                            v-on:click=""
                          >
                            Add
                          </q-btn>

                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                    <div v-if="armorsFound.length === 0">
                      <h4>No Results Found</h4>
                    </div>
                    <q-list bordered separator class="q-mt-md" v-else>
                      <q-item
                        v-ripple
                        active-class="bg-teal-1"
                        v-for="(featureFound, index) in spellsFound"
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
                    <h4> Selected Armors</h4>
                    <div v-if="equipment.armors.length === 0">
                      <h4 >No armor added yet</h4>
                    </div>
                    <q-list bordered separator class="q-mt-md" v-else>
                      <q-expansion-item
                        expand-separator
                        label="Armor name"
                      >
                        <q-separator />
                        <q-card>
                          <q-card-section>
                            Description: description Description: descriptionDescription: descriptionDescription: descriptionDescription: description
                          </q-card-section>
                          <q-card-section>
                            <q-btn
                              v-on:click=""
                            >
                              Remove
                            </q-btn>

                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-item
                        v-ripple
                        active-class="bg-teal-1"
                        v-for="(armor, index) in equipment.armors"
                      >
                        <q-item-section>
                          <q-item-label>{{ armor }}</q-item-label>
                        </q-item-section>
                        <q-btn
                          size="12px"
                          flat
                          dense
                          round
                          icon="delete"
                          v-on:click="deleteFeature(index, armor)"
                        />
                      </q-item>
                    </q-list>
                  </q-card-section>
                  <q-card-section>
                    <q-input
                      filled
                      label="Armor"
                      :rules="[]"
                      v-model="newArmor"
                    />
                    <q-btn v-on:click="searchFeature(newArmor)">
                      Search Armor
                    </q-btn>
                    <q-expansion-item
                      expand-separator
                      label="Feature name"
                    >
                      <q-card>
                        <q-card-section>
                          Description: description Description: descriptionDescription: descriptionDescription: descriptionDescription: description
                        </q-card-section>
                        <q-card-section>
                          <q-btn
                            v-on:click=""
                          >
                            Add
                          </q-btn>

                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                    <div v-if="armorsFound.length === 0">
                      <h4>No Results Found</h4>
                    </div>
                    <q-list bordered separator class="q-mt-md" v-else>
                      <q-item
                        v-ripple
                        active-class="bg-teal-1"
                        v-for="(featureFound, index) in spellsFound"
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
                    <h4> Owned Vehicles</h4>
                    <div v-if="equipment.vehicles.length === 0">
                      <h4 >No vehicles owned</h4>
                    </div>
                    <q-list bordered separator class="q-mt-md" v-else>
                      <q-expansion-item
                        expand-separator
                        label="Vehicle name"
                      >
                        <q-separator />
                        <q-card>
                          <q-card-section>
                            Description: description Description: descriptionDescription: descriptionDescription: descriptionDescription: description
                          </q-card-section>
                          <q-card-section>
                            <q-btn
                              v-on:click=""
                            >
                              Remove
                            </q-btn>

                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                      <q-item
                        v-ripple
                        active-class="bg-teal-1"
                        v-for="(vehicle, index) in equipment.vehicles"
                      >
                        <q-item-section>
                          <q-item-label>{{ vehicle }}</q-item-label>
                        </q-item-section>
                        <q-btn
                          size="12px"
                          flat
                          dense
                          round
                          icon="delete"
                          v-on:click="deleteFeature(index, vehicle)"
                        />
                      </q-item>
                    </q-list>
                  </q-card-section>
                  <q-card-section>
                    <q-input
                      filled
                      label="Armor"
                      :rules="[]"
                      v-model="newArmor"
                    />
                    <q-btn v-on:click="searchFeature(newArmor)">
                      Search Armor
                    </q-btn>
                    <q-expansion-item
                      expand-separator
                      label="Feature name"
                    >
                      <q-card>
                        <q-card-section>
                          Description: description Description: descriptionDescription: descriptionDescription: descriptionDescription: description
                        </q-card-section>
                        <q-card-section>
                          <q-btn
                            v-on:click=""
                          >
                            Add
                          </q-btn>

                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                    <div v-if="vehiclesFound.length === 0">
                      <h4>No Results Found</h4>
                    </div>
                    <q-list bordered separator class="q-mt-md" v-else>
                      <q-item
                        v-ripple
                        active-class="bg-teal-1"
                        v-for="(vehicleFound, index) in vehiclesFound"
                      >
                        <q-item-section>
                          <q-item-label>{{ vehicleFound }}</q-item-label>
                        </q-item-section>
                        <q-btn
                          size="12px"
                          flat
                          dense
                          round
                          icon="add"
                          v-on:click="addFeature(index, vehicleFound)"
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
      newArmor: "",
      armorsFound: [],
      armorsFoundBase: [],

      newVehicle: "",
      vehiclesFound: [],
      vehiclesFoundBase: [],

      newGear: "",
      gearsFound: [],
      gearsFoundBase: [],

      newGear: "",
      gearsFound: [],
      gearsFoundBase: [],

      equipment: {
        name: "",
        armorClass: 0,
        armors: [],
        attacks: [], //    { "bonus": 0,"damage": "string","name": "string","type": "string"
        currency: {
          cp: 0,
          ep: 0,
          gp: 0,
          pp: 0,
          sp: 0
        },
        gear:[],
        tools: [],
        vehicles:[],
        weapons: []
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

    deleteArmor(index, armorName) {
      this.equipment.armors.splice(index, 1);
      if(this.armorsFoundBase.includes(armorName)){
        this.armorsFound.push(armorName);
      }
    },
    deleteSearchedArmor(index){
      this.armorsFound.splice(index, 1);
    },
    addArmor(index, armorName) {
      if(this.equipment.armors.includes(armorName) === false){
        this.equipment.armors.push(armorName);
        this.deleteSearchedArmor(index);
      }else{
        notifications.methods.sendErrorNotification("Cannot add duplicate armor");
      }

    },
    searchArmor(armorName) {
      notifications.methods.sendSuccessNotification(armorName);
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/armor";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: armorName
          }
        })
        .then(response => {
          this.armorsFound = [];
          this.armorsFoundBase = [];
          var resp = response.data;
          if(resp.length === 0){
            notifications.methods.sendErrorNotification("No armors found");
          }
          for (var i = 0; i < resp.length; i++) {
            this.armorsFoundBase.push(stringFunc.methods.capitalizeFirstLetter(resp[i].name));
            if(this.equipment.armors.includes(resp[i].name) === false && resp[i].visible === true){
              this.armorsFound.push(
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

    deleteVehicle(index, vehicleName) {
      this.equipment.vehicle.splice(index, 1);
      if(this.vehiclesFoundBase.includes(vehicleName)){
        this.vehiclesFound.push(vehicleName);
      }
    },
    deleteSearchedVehicle(index){
      this.vehiclesFound.splice(index, 1);
    },
    addVehicle(index, vehicleName) {
      if(this.equipment.vehicles.includes(vehicleName) === false){
        this.equipment.vehicles.push(vehicleName);
        this.deleteSearchedVehicle(index);
      }else{
        notifications.methods.sendErrorNotification("Cannot add duplicate vehicle");
      }

    },
    searchVehicle(vehicleName) {
      notifications.methods.sendSuccessNotification(vehicleName);
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/vehicle";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: vehicleName
          }
        })
        .then(response => {
          this.vehiclesFound = [];
          this.vehiclesFoundBase = [];
          var resp = response.data;
          if(resp.length === 0){
            notifications.methods.sendErrorNotification("No vehicles found");
          }
          for (var i = 0; i < resp.length; i++) {
            this.vehiclesFoundBase.push(stringFunc.methods.capitalizeFirstLetter(resp[i].name));
            if(this.equipment.vehicles.includes(resp[i].name) === false && resp[i].visible === true){
              this.vehiclesFound.push(
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

    deleteGear(index, gearName) {
      this.equipment.features.splice(index, 1);
      if(this.gearsFoundBase.includes(gearName)){
        this.gearsFound.push(gearName);
      }
    },
    deleteSearchedGear(index){
      this.gearsFound.splice(index, 1);
    },
    addGear(index, gearName) {
      if(this.equipment.gear.includes(gearName) === false){
        this.equipment.gear.push(gearName);
        this.deleteSearchedGear(index);
      }else{
        notifications.methods.sendErrorNotification("Cannot add duplicate gear");
      }

    },
    searchGear(gearName) {
      notifications.methods.sendSuccessNotification(gearName);
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/gear";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: gearName
          }
        })
        .then(response => {
          this.gearsFound = [];
          var resp = response.data;
          this.gearsFoundBase = [];
          if(resp.length === 0){
            notifications.methods.sendErrorNotification("No gear found");
          }
          for (var i = 0; i < resp.length; i++) {
            this.gearsFoundBase.push(stringFunc.methods.capitalizeFirstLetter(resp[i].name));
            if(this.equipment.gear.includes(resp[i].name) === false && resp[i].visible === true){
              this.gearsFound.push(
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

    deleteSpell(index, featureName) {
      this.abilities.features.splice(index, 1);
      if(this.spellsFoundBase.includes(featureName)){
        this.spellsFound.push(featureName);
      }
    },
    deleteSearchedSpell(index){
      this.spellsFound.splice(index, 1);
    },
    addSpell(index, featureName) {
      if(this.abilities.features.includes(featureName) === false){
        this.abilities.features.push(featureName);
        this.deleteSearchedSpell(index);
      }else{
        notifications.methods.sendErrorNotification("Cannot add duplicate feature");
      }

    },
    searchSpell(featureName) {
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
            this.spellsFoundBase.push(stringFunc.methods.capitalizeFirstLetter(resp[i].name));
            if(this.abilities.features.includes(resp[i].name) === false && resp[i].visible === true){
              this.spellsFound.push(
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

    deleteSpell(index, featureName) {
      this.abilities.features.splice(index, 1);
      if(this.spellsFoundBase.includes(featureName)){
        this.spellsFound.push(featureName);
      }
    },
    deleteSearchedSpell(index){
      this.spellsFound.splice(index, 1);
    },
    addSpell(index, featureName) {
      if(this.abilities.features.includes(featureName) === false){
        this.abilities.features.push(featureName);
        this.deleteSearchedSpell(index);
      }else{
        notifications.methods.sendErrorNotification("Cannot add duplicate feature");
      }

    },
    searchSpell(featureName) {
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
            this.spellsFoundBase.push(stringFunc.methods.capitalizeFirstLetter(resp[i].name));
            if(this.abilities.features.includes(resp[i].name) === false && resp[i].visible === true){
              this.spellsFound.push(
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

    deleteSpell(index, featureName) {
      this.abilities.features.splice(index, 1);
      if(this.spellsFoundBase.includes(featureName)){
        this.spellsFound.push(featureName);
      }
    },
    deleteSearchedSpell(index){
      this.spellsFound.splice(index, 1);
    },
    addSpell(index, featureName) {
      if(this.abilities.features.includes(featureName) === false){
        this.abilities.features.push(featureName);
        this.deleteSearchedSpell(index);
      }else{
        notifications.methods.sendErrorNotification("Cannot add duplicate feature");
      }

    },
    searchSpell(featureName) {
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
            this.spellsFoundBase.push(stringFunc.methods.capitalizeFirstLetter(resp[i].name));
            if(this.abilities.features.includes(resp[i].name) === false && resp[i].visible === true){
              this.spellsFound.push(
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
