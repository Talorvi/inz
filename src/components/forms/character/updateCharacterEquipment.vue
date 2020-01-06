<template>
  <div>
    <template>
      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 1600px">
          <q-card>
            <div class="q-pa-md" style="max-width: 16000px">
              <q-form @submit="onSubmit" class="q-gutter-md">
                <h5>Character: {{ equipment.name }}</h5>
                <q-tabs
                  v-model="tab"
                  dense
                  class="text-grey"
                  active-color="accent"
                  indicator-color="accent"
                  align="justify"
                  narrow-indicator
                >
                  <q-tab name="weapons" icon="fas fa-khanda" label="Weapons" />
                  <q-tab
                    name="armors"
                    icon="fas fa-shield-alt"
                    label="Armors"
                  />
                  <q-tab name="gears" icon="fas fa-cog" label="Gear" />
                  <q-tab name="tools" icon="fas fa-hammer" label="Tools" />
                  <q-tab name="vehicles" icon="fas fa-horse" label="Vehicles" />
                  <q-tab name="money" icon="fas fa-coins" label="Money" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                  <q-tab-panel name="weapons">
                    <q-card>
                      <q-card-section>
                        <div>
                          <h5>Attack list:</h5>
                          <q-list bordered separator class="q-mt-md">
                            <q-item
                              v-ripple
                              active-class="bg-teal-1"
                              v-for="(attack, index) in equipment.attacks"
                            >
                              <q-item-section>
                                <div class="row no-wrap">
                                  <q-input
                                    filled
                                    v-model="attack.name"
                                    label="Name"
                                  />
                                  <q-input
                                    filled
                                    v-model="attack.type"
                                    label="Type"
                                  />
                                  <q-input
                                    filled
                                    v-model="attack.damage"
                                    label="Damage"
                                  />
                                  <q-input
                                    filled
                                    v-model="attack.bonus"
                                    label="Bonus"
                                    type="number"
                                  />
                                </div>
                              </q-item-section>
                              <q-btn
                                size="12px"
                                flat
                                dense
                                round
                                icon="delete"
                                v-on:click="deleteAttack(index)"
                              />
                            </q-item>
                          </q-list>
                          <q-btn v-on:click="addAttack()"> Add Attack</q-btn>
                        </div>
                      </q-card-section>
                      <q-separator />
                      <q-card-section>
                        <h5>Selected Weapons</h5>
                        <div v-if="equipment.weapons.length === 0">
                          <h5>No weapons added yet</h5>
                        </div>
                        <q-list bordered separator class="q-mt-md" v-else>
                          <q-item
                            v-ripple
                            active-class="bg-teal-1"
                            v-for="(weapon, index) in equipment.weapons"
                          >
                            <q-item-section class="q-pt-md">
                              <q-item-label>{{ weapon.name }}</q-item-label>
                              <q-input
                                filled
                                label="Amount"
                                :rules="[]"
                                v-model="weapon.amount"
                                type="number"
                              />
                            </q-item-section>
                            <q-btn
                              size="12px"
                              flat
                              dense
                              round
                              icon="delete"
                              v-on:click="deleteWeapon(index, weapon.name)"
                              class="self-center"
                            />
                          </q-item>
                        </q-list>
                      </q-card-section>
                      <q-card-section>
                        <q-input
                          filled
                          label="Weapon"
                          :rules="[]"
                          v-model="newWeapon"
                        />
                        <q-btn v-on:click="searchWeapon(newWeapon)">
                          Search weapon
                        </q-btn>
                        <div v-if="weaponsFound.length === 0">
                          <h5>No Results Found</h5>
                        </div>
                        <q-list bordered separator class="q-mt-md" v-else>
                          <q-item
                            v-ripple
                            active-class="bg-teal-1"
                            v-for="(weaponFound, index) in weaponsFound"
                          >
                            <q-item-section
                              @click="showWeaponDialog(weaponFound)"
                              class="row q-pt-sm"
                            >
                              <q-item-label>{{ weaponFound }}</q-item-label>
                            </q-item-section>
                            <q-btn
                              size="12px"
                              flat
                              dense
                              round
                              icon="add"
                              v-on:click="addWeapon(index, weaponFound)"
                              class="self-center"
                            />
                          </q-item>
                        </q-list>
                      </q-card-section>
                    </q-card>
                  </q-tab-panel>
                  <q-tab-panel name="armors">
                    <q-card>
                      <q-card-section>
                        <q-input
                          filled
                          v-model="equipment.armorClass"
                          label="Armor Class"
                          type="number"
                        />
                      </q-card-section>
                      <q-separator></q-separator>
                      <q-card-section>
                        <h5>Selected Armors</h5>
                        <div v-if="equipment.armors.length === 0">
                          <h5>No armors added yet</h5>
                        </div>
                        <q-list bordered separator class="q-mt-md" v-else>
                          <q-item
                            v-ripple
                            active-class="bg-teal-1"
                            v-for="(armor, index) in equipment.armors"
                          >
                            <q-item-section class="q-pt-md">
                              <q-item-label
                                @click="showArmorDialog(armor.name)"
                                >{{ armor.name }}</q-item-label
                              >
                              <q-input
                                filled
                                label="Amount"
                                :rules="[]"
                                v-model="armor.amount"
                                type="number"
                              />
                            </q-item-section>
                            <q-btn
                              size="12px"
                              flat
                              dense
                              round
                              icon="delete"
                              v-on:click="deleteArmor(index, armor.name)"
                              class="self-center"
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
                        <q-btn v-on:click="searchArmor(newArmor)">
                          Search armor
                        </q-btn>
                        <div v-if="armorsFound.length === 0">
                          <h5>No Results Found</h5>
                        </div>
                        <q-list bordered separator class="q-mt-md" v-else>
                          <q-item
                            v-ripple
                            active-class="bg-teal-1"
                            v-for="(armorFound, index) in armorsFound"
                          >
                            <q-item-section
                              @click="showArmorDialog(armorFound)"
                            >
                              <q-item-label>{{ armorFound }}</q-item-label>
                            </q-item-section>
                            <q-btn
                              size="12px"
                              flat
                              dense
                              round
                              icon="add"
                              v-on:click="addArmor(index, armorFound)"
                            />
                          </q-item>
                        </q-list>
                      </q-card-section>
                    </q-card>
                  </q-tab-panel>
                  <q-tab-panel name="gears">
                    <q-card>
                      <q-card-section>
                        <h5>Selected Gears</h5>
                        <div v-if="equipment.gear.length === 0">
                          <h5>No gears added yet</h5>
                        </div>
                        <q-list bordered separator class="q-mt-md" v-else>
                          <q-item
                            v-ripple
                            active-class="bg-teal-1"
                            v-for="(gear, index) in equipment.gear"
                          >
                            <q-item-section class="q-pt-md">
                              <q-item-label
                                @click="showGearDialog(gear.name)"
                                >{{ gear.name }}</q-item-label
                              >
                              <q-input
                                filled
                                label="Amount"
                                :rules="[]"
                                v-model="gear.amount"
                                type="number"
                              />
                            </q-item-section>
                            <q-btn
                              size="12px"
                              flat
                              dense
                              round
                              icon="delete"
                              v-on:click="deleteGear(index, gear.name)"
                              class="self-center"
                            />
                          </q-item>
                        </q-list>
                      </q-card-section>
                      <q-card-section>
                        <q-input
                          filled
                          label="Gear"
                          :rules="[]"
                          v-model="newGear"
                        />
                        <q-btn v-on:click="searchGear(newGear)">
                          Search gear
                        </q-btn>
                        <div v-if="gearsFound.length === 0">
                          <h5>No Results Found</h5>
                        </div>
                        <q-list bordered separator class="q-mt-md" v-else>
                          <q-item
                            v-ripple
                            active-class="bg-teal-1"
                            v-for="(gearFound, index) in gearsFound"
                          >
                            <q-item-section @click="showGearDialog(gearFound)">
                              <q-item-label>{{ gearFound }}</q-item-label>
                            </q-item-section>
                            <q-btn
                              size="12px"
                              flat
                              dense
                              round
                              icon="add"
                              v-on:click="addGear(index, gearFound)"
                            />
                          </q-item>
                        </q-list>
                      </q-card-section>
                    </q-card>
                  </q-tab-panel>
                  <q-tab-panel name="tools">
                    <q-card>
                      <q-card-section>
                        <h5>Selected Tools</h5>
                        <div v-if="equipment.tools.length === 0">
                          <h5>No tools added yet</h5>
                        </div>
                        <q-list bordered separator class="q-mt-md" v-else>
                          <q-item
                            v-ripple
                            active-class="bg-teal-1"
                            v-for="(tool, index) in equipment.tools"
                          >
                            <q-item-section>
                              <q-item-label
                                @click="showToolDialog(tool.name)"
                                class="q-pt-md"
                                >{{ tool.name }}</q-item-label
                              >
                              <q-input
                                filled
                                label="Amount"
                                :rules="[]"
                                v-model="tool.amount"
                                type="number"
                              />
                            </q-item-section>
                            <q-btn
                              size="12px"
                              flat
                              dense
                              round
                              icon="delete"
                              v-on:click="deleteTool(index, tool.name)"
                              class="self-center"
                            />
                          </q-item>
                        </q-list>
                      </q-card-section>
                      <q-card-section>
                        <q-input
                          filled
                          label="Tool"
                          :rules="[]"
                          v-model="newTool"
                        />
                        <q-btn v-on:click="searchTool(newTool)">
                          Search tool
                        </q-btn>
                        <div v-if="toolsFound.length === 0">
                          <h5>No Results Found</h5>
                        </div>
                        <q-list bordered separator class="q-mt-md" v-else>
                          <q-item
                            v-ripple
                            active-class="bg-teal-1"
                            v-for="(toolFound, index) in toolsFound"
                          >
                            <q-item-section @click="showToolDialog(toolFound)">
                              <q-item-label>{{ toolFound }}</q-item-label>
                            </q-item-section>
                            <q-btn
                              size="12px"
                              flat
                              dense
                              round
                              icon="add"
                              v-on:click="addTool(index, toolFound)"
                            />
                          </q-item>
                        </q-list>
                      </q-card-section>
                    </q-card>
                  </q-tab-panel>
                  <q-tab-panel name="vehicles">
                    <q-card>
                      <q-card-section>
                        <h5>Selected Vehicles</h5>
                        <div v-if="equipment.vehicles.length === 0">
                          <h5>No vehicles added yet</h5>
                        </div>
                        <q-list bordered separator class="q-mt-md" v-else>
                          <q-item
                            v-ripple
                            active-class="bg-teal-1"
                            v-for="(vehicle, index) in equipment.vehicles"
                          >
                            <q-item-section>
                              <q-item-label
                                @click="showVehicleDialog(vehicle.name)"
                                class="q-pt-md"
                                >{{ vehicle.name }}</q-item-label
                              >
                              <q-input
                                filled
                                label="Amount"
                                :rules="[]"
                                v-model="vehicle.amount"
                                type="number"
                              />
                            </q-item-section>
                            <q-btn
                              size="12px"
                              flat
                              dense
                              round
                              icon="delete"
                              v-on:click="deleteVehicle(index, vehicle.name)"
                              class="self-center"
                            />
                          </q-item>
                        </q-list>
                      </q-card-section>
                      <q-card-section>
                        <q-input
                          filled
                          label="Vehicle"
                          :rules="[]"
                          v-model="newVehicle"
                        />
                        <q-btn v-on:click="searchVehicle(newVehicle)">
                          Search vehicle
                        </q-btn>
                        <div v-if="vehiclesFound.length === 0">
                          <h5>No Results Found</h5>
                        </div>
                        <q-list bordered separator class="q-mt-md" v-else>
                          <q-item
                            v-ripple
                            active-class="bg-teal-1"
                            v-for="(vehicleFound, index) in vehiclesFound"
                          >
                            <q-item-section
                              @click="showVehicleDialog(vehicleFound)"
                            >
                              <q-item-label>{{ vehicleFound }}</q-item-label>
                            </q-item-section>
                            <q-btn
                              size="12px"
                              flat
                              dense
                              round
                              icon="add"
                              v-on:click="addVehicle(index, vehicleFound)"
                            />
                          </q-item>
                        </q-list>
                      </q-card-section>
                    </q-card>
                  </q-tab-panel>
                  <q-tab-panel name="money">
                    <q-card>
                      <q-card-section>
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
                      </q-card-section>
                    </q-card>
                  </q-tab-panel>
                </q-tab-panels>
                <q-btn label="Submit" size="lg" type="submit" color="accent" />
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

      tab: "weapons",

      newArmor: "",
      armorsFound: [],
      armorsFoundBase: [],

      newWeapon: "",
      weaponsFound: [],
      weaponsFoundBase: [],

      newGear: "",
      gearsFound: [],
      gearsFoundBase: [],

      newTool: "",
      toolsFound: [],
      toolsFoundBase: [],

      newVehicle: "",
      vehiclesFound: [],
      vehiclesFoundBase: [],
      equipment: {
        name: "",
        armorClass: 0,
        armors: [],
        attacks: [],
        currency: {
          cp: 0,
          ep: 0,
          gp: 0,
          pp: 0,
          sp: 0
        },
        gear: [],
        tools: [],
        vehicles: [],
        weapons: []
      },
      characterName: "general",
      featuresToDisplay: [{}, {}, {}, {}, {}]
    };
  },
  mounted() {
    this.characterName = this.$route.params.charName;
    this.getCharacterByName(this.characterName);
  },
  methods: {
    showWeaponDialog(name) {
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/weapon?name=" +
        name;
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
        })
        .then(response => {
          this.name =
            response.data[0].name +
            " - " +
            response.data[0].normalRange +
            "|" +
            response.data[0].longRange +
            "ft";
          this.description =
            response.data[0].category +
            " " +
            response.data[0].weaponRange +
            " weapon. \n" +
            response.data[0].damageDice +
            " " +
            response.data[0].damageType +
            " damage.\n Cost: " +
            response.data[0].cost;
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
    showArmorDialog(name) {
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/armor?name=" +
        name;
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
        })
        .then(response => {
          this.name =
            response.data[0].name +
            " - " +
            response.data[0].armorClass.base +
            "AC";
          this.description = response.data[0].cost;

          if (response.data[0].stealthDisadvantage) {
            this.description += ". Has stealth disadvantage.";
          }

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
    showGearDialog(name) {
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/gear?name=" +
        name;
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
        })
        .then(response => {
          this.name = response.data[0].name + " - " + response.data[0].cost;
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
    showToolDialog(name) {
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/tool?name=" +
        name;
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
        })
        .then(response => {
          this.name = response.data[0].name + " - " + response.data[0].cost;
          this.description = response.data[0].description;

          this.dialog = true;
        })
        .catch(error => {
          console.log(error);
          if (error.response.status === 401) {
            notifications.methods.sendErrorNotification("Unauthorized");
          } else {
            notifications.methods.sendErrorNotification(error.response.data);
          }
        });
    },
    showVehicleDialog(name) {
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/vehicle?name=" +
        name;
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
        })
        .then(response => {
          this.name = response.data[0].name + " - " + response.data[0].cost;
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
    onSubmit() {
      this.$store.dispatch("updateCharacterEquipment", {
        equipment: this.equipment,
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
        this.equipment = {
          name: characterName,
          armorClass: char.equipment.armorClass,
          armors: char.equipment.armors,
          attacks: char.equipment.attacks, //    { "bonus": 0,"damage": "string","name": "string","type": "string"
          currency: char.equipment.currency,
          gear: char.equipment.gear,
          tools: char.equipment.tools,
          vehicles: char.equipment.vehicles,
          weapons: char.equipment.weapons
        };
      } else {
        notifications.methods.sendErrorNotification(
          "Haven't found character " + characterName
        );
      }
    },
    //
    checkIfArrayContainsItem(array, name) {
      for (var i = 0; i < array.length; i++) {
        if (array[i].name === name) {
          return true;
        }
      }
      return false;
    },
    deleteArmor(index, armorName) {
      this.equipment.armors.splice(index, 1);
      if (this.armorsFoundBase.includes(armorName)) {
        this.armorsFound.push(armorName);
      }
    },
    deleteSearchedArmor(index) {
      this.armorsFound.splice(index, 1);
    },
    addArmor(index, armorName) {
      if (
        this.checkIfArrayContainsItem(this.equipment.armors, armorName) ===
        false
      ) {
        this.equipment.armors.push({ name: armorName, amount: 1 });
        this.deleteSearchedArmor(index);
      } else {
        notifications.methods.sendErrorNotification(
          "Cannot add duplicate armor"
        );
      }
    },
    searchArmor(armorName) {
      notifications.methods.sendSuccessNotification(armorName);
      var targetURL =
        "api/api/v1/scenario/" + this.$store.getters.getScenarioKey + "/armor";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: armorName
          }
        })
        .then(response => {
          this.armorsFound = [];
          var resp = response.data;
          this.armorsFoundBase = [];
          if (resp.length === 0) {
            notifications.methods.sendErrorNotification("No armors found");
          }
          for (var i = 0; i < resp.length; i++) {
            this.armorsFoundBase.push(
              stringFunc.methods.capitalizeFirstLetter(resp[i].name)
            );
            if (
              !this.checkIfArrayContainsItem(
                this.equipment.armors,
                resp[i].name
              ) &&
              resp[i].visible === true
            ) {
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
      this.equipment.vehicles.splice(index, 1);
      if (this.vehiclesFoundBase.includes(vehicleName)) {
        this.vehiclesFound.push(vehicleName);
      }
    },
    deleteSearchedVehicle(index) {
      this.vehiclesFound.splice(index, 1);
    },
    addVehicle(index, vehicleName) {
      if (
        this.checkIfArrayContainsItem(this.equipment.vehicles, vehicleName) ===
        false
      ) {
        this.equipment.vehicles.push({ name: vehicleName, amount: 1 });
        this.deleteSearchedVehicle(index);
      } else {
        notifications.methods.sendErrorNotification(
          "Cannot add duplicate vehicle"
        );
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
          var resp = response.data;
          this.vehiclesFoundBase = [];
          if (resp.length === 0) {
            notifications.methods.sendErrorNotification("No vehicles found");
          }
          for (var i = 0; i < resp.length; i++) {
            this.vehiclesFoundBase.push(
              stringFunc.methods.capitalizeFirstLetter(resp[i].name)
            );
            if (
              !this.checkIfArrayContainsItem(
                this.equipment.vehicles,
                resp[i].name
              ) &&
              resp[i].visible === true
            ) {
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
      this.equipment.gear.splice(index, 1);
      if (this.gearsFoundBase.includes(gearName)) {
        this.gearsFound.push(gearName);
      }
    },
    deleteSearchedGear(index) {
      this.gearsFound.splice(index, 1);
    },
    addGear(index, gearName) {
      if (
        this.checkIfArrayContainsItem(this.equipment.gear, gearName) === false
      ) {
        this.equipment.gear.push({ name: gearName, amount: 1 });
        this.deleteSearchedGear(index);
      } else {
        notifications.methods.sendErrorNotification(
          "Cannot add duplicate gear"
        );
      }
    },
    searchGear(gearName) {
      notifications.methods.sendSuccessNotification(gearName);
      var targetURL =
        "api/api/v1/scenario/" + this.$store.getters.getScenarioKey + "/gear";
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
          if (resp.length === 0) {
            notifications.methods.sendErrorNotification("No armors found");
          }
          for (var i = 0; i < resp.length; i++) {
            this.gearsFoundBase.push(
              stringFunc.methods.capitalizeFirstLetter(resp[i].name)
            );
            if (
              !this.checkIfArrayContainsItem(
                this.equipment.gear,
                resp[i].name
              ) &&
              resp[i].visible === true
            ) {
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

    deleteTool(index, toolName) {
      this.equipment.tools.splice(index, 1);
      if (this.toolsFoundBase.includes(toolName)) {
        this.toolsFound.push(toolName);
      }
    },
    deleteSearchTool(index) {
      this.toolsFound.splice(index, 1);
    },
    addTool(index, toolName) {
      if (
        this.checkIfArrayContainsItem(this.equipment.tools, toolName) === false
      ) {
        this.equipment.tools.push({ name: toolName, amount: 1 });
        this.deleteSearchTool(index);
      } else {
        notifications.methods.sendErrorNotification(
          "Cannot add duplicate tool"
        );
      }
    },
    searchTool(toolName) {
      notifications.methods.sendSuccessNotification(toolName);
      var targetURL =
        "api/api/v1/scenario/" + this.$store.getters.getScenarioKey + "/tool";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: toolName
          }
        })
        .then(response => {
          this.toolsFound = [];
          var resp = response.data;
          this.toolsFoundBase = [];
          if (resp.length === 0) {
            notifications.methods.sendErrorNotification("No tools found");
          }
          for (var i = 0; i < resp.length; i++) {
            this.toolsFoundBase.push(
              stringFunc.methods.capitalizeFirstLetter(resp[i].name)
            );
            if (
              !this.checkIfArrayContainsItem(
                this.equipment.tools,
                resp[i].name
              ) &&
              resp[i].visible === true
            ) {
              this.toolsFound.push(
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

    deleteWeapon(index, weaponName) {
      this.equipment.weapons.splice(index, 1);
      if (this.weaponsFoundBase.includes(weaponName)) {
        this.weaponsFound.push(weaponName);
      }
    },
    deleteSearchedWeapon(index) {
      this.weaponsFound.splice(index, 1);
    },
    addWeapon(index, weaponName) {
      if (
        this.checkIfArrayContainsItem(this.equipment.weapons, weaponName) ===
        false
      ) {
        this.equipment.weapons.push({ name: weaponName, amount: 1 });
        this.deleteSearchedWeapon(index);
      } else {
        notifications.methods.sendErrorNotification(
          "Cannot add duplicate weapon"
        );
      }
    },
    searchWeapon(weaponName) {
      notifications.methods.sendSuccessNotification(weaponName);
      var targetURL =
        "api/api/v1/scenario/" + this.$store.getters.getScenarioKey + "/weapon";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: weaponName
          }
        })
        .then(response => {
          this.weaponsFound = [];
          var resp = response.data;
          this.weaponsFoundBase = [];
          if (resp.length === 0) {
            notifications.methods.sendErrorNotification("No weapons found");
          }
          for (var i = 0; i < resp.length; i++) {
            this.weaponsFoundBase.push(
              stringFunc.methods.capitalizeFirstLetter(resp[i].name)
            );
            if (
              !this.checkIfArrayContainsItem(
                this.equipment.weapons,
                resp[i].name
              ) &&
              resp[i].visible === true
            ) {
              this.weaponsFound.push(
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

    addAttack() {
      this.equipment.attacks.push({
        name: "",
        type: "",
        damage: "",
        bonus: 0
      });
    },
    deleteAttack(index) {
      this.equipment.attacks.splice(index, 1);
    },
    getExactFeatureByName(featureName, type, index) {
      var targetURL =
        "api/api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/" +
        type;
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: featureName
          }
        })
        .then(response => {
          var resp = response.data;
          s;
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].name.toLowerCase() === featureName.toLowerCase()) {
              console.log("Condition fulfilled" + resp[i].name.toLowerCase());
              this.featuresToDisplay[index] = resp[i];
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
