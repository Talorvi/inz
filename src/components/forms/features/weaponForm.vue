<template>
  <div class="text-center">
    <div v-if="weapon.scenarioKey === null">
      <h5>This weapon cannot be edited</h5>
      <h5>Name: {{ weapon.name }}</h5>
      <h5>Category: {{ weapon.category }}</h5>
      <h5>Damage Type: {{ weapon.damageType }}</h5>
      <h5>Damage Dice: {{ weapon.damageDice }}</h5>
      <h5>Damage Bonus: {{ weapon.damageBonus }}</h5>
      <h5>Cost: {{ weapon.cost }}</h5>
      <h5>Weapon Range: {{ weapon.weaponRange }}</h5>
      <h5>Normal Range: {{ weapon.normalRange }}</h5>
      <h5>Long Range: {{ weapon.longRange }}</h5>
      <h5>Normal Throw Range: {{ weapon.normalThrowRange }}</h5>
      <h5>Long Throw Range: {{ weapon.longThrowRange }}</h5>
      <h5>Weight: {{ weapon.weight }}</h5>
      <div class="row">
        <h5 >Properties:</h5>
        <h5 v-for="property in weapon.properties"> {{property}}, </h5>
      </div>
    </div>
    <q-form
      @submit="createFeature"
      @reset="onReset"
      class="q-gutter-md"
      v-else-if="weaponName === 'new'"
    >
      <q-input filled label="Name" :rules="[]" v-model="weapon.name" />
      <q-input filled label="Category" :rules="[]" v-model="weapon.category" />
      <q-input filled label="Damage Type" :rules="[]" v-model="weapon.damageType" />
      <q-input filled label="Damage Dice" :rules="[]" v-model="weapon.damageDice" />
      <q-input filled label="Damage Bonus" type="number" :rules="[]" v-model="weapon.damageBonus" />
      <q-input filled label="Cost" :rules="[]" v-model="weapon.cost" />
      <q-input filled label="Weapon Range" :rules="[]" v-model="weapon.weaponRange" />
      <q-input filled label="Normal Range" type="number" :rules="[]" v-model="weapon.normalRange" />
      <q-input filled label="Long Range" type="number" :rules="[]" v-model="weapon.longRange" />
      <q-input filled label="Normal Throw Range" type="number" :rules="[]" v-model="weapon.normalThrowRange" />
      <q-input filled label="Long Throw Range" type="number" :rules="[]" v-model="weapon.longThrowRange" />
      <q-input filled label="Weight" :rules="[]" type="number" v-model="weapon.weight" />
      <q-toggle color="green" label="Visible" v-model="weapon.visible" />

      <q-card>
        <q-card-section>
          <q-input filled label="Property" :rules="[]" v-model="newProperty" />
          <q-btn v-on:click="addProperty(newProperty)">
            Add Property
          </q-btn>
          <q-list bordered separator class="q-mt-md">
            <q-item
              v-ripple
              active-class="bg-teal-1"
              v-for="(property, index) in weapon.properties"
            >
              <q-item-section>
                <q-item-label>{{ property }}</q-item-label>
              </q-item-section>
              <q-btn
                size="12px"
                flat
                dense
                round
                icon="delete"
                v-on:click="deleteProperty(index)"
              />
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
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
      v-else-if="weaponName !== 'new' && searchResultFound === true"
    >
      <h5>Weapon: {{ weapon.name }}</h5>
      <q-input filled label="Category" :rules="[]" v-model="weapon.category" />
      <q-input filled label="Damage Type" :rules="[]" v-model="weapon.damageType" />
      <q-input filled label="Damage Dice" :rules="[]" v-model="weapon.damageDice" />
      <q-input filled label="Damage Bonus" type="number" :rules="[]" v-model="weapon.damageBonus" />
      <q-input filled label="Cost" :rules="[]" v-model="weapon.cost" />
      <q-input filled label="Weapon Range" :rules="[]" v-model="weapon.weaponRange" />
      <q-input filled label="Normal Range" type="number" :rules="[]" v-model="weapon.normalRange" />
      <q-input filled label="Long Range" :rules="[]" v-model="weapon.longRange" />
      <q-input filled label="Normal Throw Range" type="number" :rules="[]" v-model="weapon.normalThrowRange" />
      <q-input filled label="Long Throw Range" type="number" :rules="[]" v-model="weapon.longThrowRange" />
      <q-input filled label="Weight" :rules="[]" type="number" v-model="weapon.weight" />
      <q-toggle color="green" label="Visible" v-model="weapon.visible" />
      <q-card>
        <q-card-section>
          <q-input filled label="Property" :rules="[]" v-model="newProperty" />
          <q-btn v-on:click="addProperty(newProperty)">
            Add Property
          </q-btn>
          <q-list bordered separator class="q-mt-md">
            <q-item
              v-ripple
              active-class="bg-teal-1"
              v-for="(property, index) in weapon.properties"
            >
              <q-item-section>
                <q-item-label>{{ property }}</q-item-label>
              </q-item-section>
              <q-btn
                size="12px"
                flat
                dense
                round
                icon="delete"
                v-on:click="deleteProperty(index)"
              />
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
    <div v-else>
      <h5>Haven't found weapon with name: {{ weaponName }}.</h5>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import notifications from "../../../functions/notifications";
export default {
  data() {
    return {
      weaponName: "",
      newProperty:"",
      weapon: {
        category: "",
        cost: "",
        damageBonus: 0,
        damageDice: "",
        damageType: "",
        longRange: 0,
        longThrowRange: 0,
        name: "",
        normalRange: 0,
        normalThrowRange: 0,
        properties: [],
        visible: true,
        weaponRange: "",
        weight: 0
      },
      searchResultFound: false
    };
  },
  mounted() {
    this.weaponName = this.$route.params.weaponName;
    if (this.weaponName !== "new") {
      this.getExactFeatureByName(this.weaponName);
    }
    //new -> no fill to fields, submit creates a new one
    //existing -> fill fields, name cannot be changed , submit patch existing one
    //not new and not existing -> 404!
  },
  methods: {
    addProperty(weaponPropertyName){

      var targetURL =
        "api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/weaponProperty";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: weaponPropertyName
          }
        })
        .then(response => {
          let resultFound = false;
          var resp = response.data;
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].name.toLowerCase() === weaponPropertyName.toLowerCase()) {
              console.log("Condition fulfilled" + resp[i].name.toLowerCase());
              resultFound = true;
              this.weapon.properties.push(this.capitalizeFirstLetter(resp[i].name));
              this.newProperty = "";
              break;
            }
          }
          if(resultFound === false){
            notifications.methods.sendErrorNotification("Haven't found property: " + weaponPropertyName);
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
    deleteProperty(index){
      this.weapon.properties.splice(index,1);
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    createFeature() {
      var targetURL =
        "api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/weapon";
      axios
        .post(
          targetURL,
          {
            category: this.weapon.category,
            cost: this.weapon.cost,
            damageBonus: this.weapon.damageBonus,
            damageDice: this.weapon.damageDice,
            damageType: this.capitalizeFirstLetter(this.weapon.damageType),
            longRange: this.weapon.longRange,
            longThrowRange: this.weapon.longThrowRange,
            name: this.weapon.name,
            normalRange: this.weapon.normalRange,
            normalThrowRange: this.weapon.normalThrowRange,
            properties: this.weapon.properties,
            weaponRange: this.weapon.weaponRange,
            weight: this.weapon.weight,
            visible: this.weapon.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully created weapon"
          );
          this.weapon.category = "";
          this.weapon.cost = "";
          this.weapon.damageBonus = 0;
          this.weapon.damageDice = "";
          this.weapon.damageType = "";
          this.weapon.longRange = 0;
          this.weapon.longThrowRange = 0;
          this.weapon.name = "";
          this.weapon.normalRange = 0;
          this.weapon.normalThrowRange = 0;
          this.weapon.properties = [];
          this.weapon.weaponRange = "";
          this.weapon.weight = 0;
          this.weapon.visible = false;
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
        "/weapon";
      axios
        .patch(
          targetURL,
          {
            category: this.weapon.category,
            cost: this.weapon.cost,
            damageBonus: this.weapon.damageBonus,
            damageDice: this.weapon.damageDice,
            damageType: this.capitalizeFirstLetter(this.weapon.damageType),
            longRange: this.weapon.longRange,
            longThrowRange: this.weapon.longThrowRange,
            name: this.weapon.name,
            normalRange: this.weapon.normalRange,
            normalThrowRange: this.weapon.normalThrowRange,
            properties: this.weapon.properties,
            weaponRange: this.weapon.weaponRange,
            weight: this.weapon.weight,
            visible: this.weapon.visible
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully updated weapon"
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
      this.weapon.category = "";
      this.weapon.cost = "";
      this.weapon.damageBonus = 0;
      this.weapon.damageDice = "";
      this.weapon.damageType = "";
      this.weapon.longRange = 0;
      this.weapon.longThrowRange = 0;
      this.weapon.name = "";
      this.weapon.normalRange = 0;
      this.weapon.normalThrowRange = 0;
      this.weapon.properties = [];
      this.weapon.weaponRange = "";
      this.weapon.weight = 0;
      this.weapon.visible = false;
    },
    getExactFeatureByName(weaponName) {
      var targetURL =
        "api/v1/scenario/" +
        this.$store.getters.getScenarioKey +
        "/weapon";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: weaponName
          }
        })
        .then(response => {
          var resp = response.data;
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].name.toLowerCase() === weaponName.toLowerCase()) {
              this.weapon = resp[i];
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
