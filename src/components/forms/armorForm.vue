<template>
  <div>
    <div v-if="armor.scenarioKey === null">
      <h5>This armor cannot be edited</h5>
      <h5>Name: {{ armor.name }}</h5>
      <h5>Base Armor: {{ armor.armorClass.base }}</h5>
      <h5>Armor Class DEX Bonus: {{ armor.armorClass.dexBonus }}</h5>
      <h5>Max Bonus: {{ armor.armorClass.maxBonus }}</h5>
      <h5>Cost: {{ armor.cost }}</h5>
      <h5>Stealth Disadvantage: {{ armor.stealthDisadvantage }}</h5>
      <h5>Min Strength: {{ armor.strMinimum }}</h5>
      <h5>Weight: {{ armor.weight }}</h5>
    </div>
    <q-form
      @submit="createFeature"
      @reset="onReset"
      class="q-gutter-md"
      v-else-if="armorName === 'new'"
    >
      <q-input filled label="Name" :rules="[]" v-model="armor.name" />
      <q-input
        filled
        label="Armor Class base"
        :rules="[]"
        type="number"
        v-model="armor.armorClass.base"
      />
      <q-input
        filled
        label="Max Bonus"
        :rules="[]"
        type="number"
        v-model="armor.armorClass.maxBonus"
      />
      <q-toggle
        color="green"
        label="Armor Class DEX Bonus:"
        v-model="armor.armorClass.dexBonus"
      />
      <q-input filled label="Cost" :rules="[]" v-model="armor.cost" />
      <q-toggle
        color="green"
        label="Stealth Disadvantage:"
        v-model="armor.stealthDisadvantage"
      />
      <q-input
        filled
        label="Min Strength"
        :rules="[]"
        type="number"
        v-model="armor.strMinimum"
      />
      <q-input filled label="Weight" :rules="[]" type="number" v-model="armor.weight" />
      <q-toggle color="green" label="Visible" v-model="armor.visible" />
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
      v-else-if="armorName !== 'new' && searchResultFound === true"
    >
      <h3>Armor: {{ armor.name }}</h3>
      <q-input
        filled
        label="Armor Class base"
        :rules="[]"
        type="number"
        v-model="armor.armorClass.base"
      />
      <q-input
        filled
        label="Max Bonus"
        :rules="[]"
        type="number"
        v-model="armor.armorClass.maxBonus"
      />
      <q-toggle
        color="green"
        label="Armor Class DEX Bonus:"
        v-model="armor.armorClass.dexBonus"
      />
      <q-input filled label="Cost" :rules="[]" v-model="armor.cost" />
      <q-toggle
        color="green"
        label="Stealth Disadvantage:"
        v-model="armor.stealthDisadvantage"
      />
      <q-input
        filled
        label="Min Strength"
        :rules="[]"
        type="number"
        v-model="armor.strMinimum"
      />
      <q-input filled label="Weight" :rules="[]"  type="number" v-model="armor.weight" />
      <q-toggle color="green" label="Visible" v-model="armor.visible" />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
    <div v-else>
      <h5>Haven't found armor with name: {{ armorName }}.</h5>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import notifications from "../../functions/notifications";
export default {
  data() {
    return {
      armorName: "",
      armor: {
        armorClass: {
          base: 0,
          dexBonus: false,
          maxBonus: 0
        },
        cost: "",
        name: "",
        stealthDisadvantage: false,
        strMinimum: 0,
        visible: false,
        weight: 0
      },
      searchResultFound: false
    };
  },
  mounted() {
    this.armorName = this.$route.params.armorName;
    if (this.armorName !== "new") {
      this.getExactFeatureByName(this.armorName);
    }
    //new -> no fill to fields, submit creates a new one
    //existing -> fill fields, name cannot be changed , submit patch existing one
    //not new and not existing -> 404!
  },
  methods: {
    createFeature() {
      var targetURL =
        "api/api/v1/scenario/" + this.$store.getters.getScenarioKey + "/armor";
      axios
        .post(
          targetURL,
          {
            armorClass: {
              base: this.armor.armorClass.base,
              dexBonus: this.armor.armorClass.dexBonus,
              maxBonus: this.armor.armorClass.maxBonus
            },
            cost: this.armor.cost,
            name: this.armor.name,
            stealthDisadvantage: this.armor.stealthDisadvantage,
            strMinimum: this.armor.strMinimum,
            visible: this.armor.visible,
            weight: this.armor.weight
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully created armor"
          );
          this.armor.armorClass.base = "";
          this.armor.armorClass.dexBonus = false;
          this.armor.armorClass.maxBonus = "";
          this.armor.cost = "";
          this.armor.name = "";
          this.armor.stealthDisadvantage = false;
          this.armor.strMinimum = 0;
          this.armor.visible = false;
          this.armor.weight = 0;
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
        "/armor";
      axios
        .patch(
          targetURL,
          {
            armorClass: {
              base: this.armor.armorClass.base,
              dexBonus: this.armor.armorClass.dexBonus,
              maxBonus: this.armor.armorClass.maxBonus
            },
            cost: this.armor.cost,
            name: this.armor.name,
            stealthDisadvantage: this.armor.stealthDisadvantage,
            strMinimum: this.armor.strMinimum,
            visible: this.armor.visible,
            weight: this.armor.weight
          },
          {
            headers: { Authorization: "bearer " + this.$store.getters.loggedIn }
          }
        )
        .then(() => {
          notifications.methods.sendSuccessNotification(
            "Successfully updated armor"
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
      this.armor.armorClass.base = "";
      this.armor.armorClass.dexBonus = false;
      this.armor.armorClass.maxBonus = "";
      this.armor.cost = "";
      this.armor.name = "";
      this.armor.stealthDisadvantage = false;
      this.armor.strMinimum = 0;
      this.armor.visible = false;
      this.armor.weight = 0;
    },
    getExactFeatureByName(armorName) {
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
          console.log("This is mounted method");
          var resp = response.data;
          console.log("This is returned feature", resp);
          for (var i = 0; i < resp.length; i++) {
            if (resp[i].name.toLowerCase() === armorName.toLowerCase()) {
              console.log("Condition fulfilled" + resp[i].name.toLowerCase());
              this.armor = resp[i];
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
