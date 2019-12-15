<template>
  <div>
    <template>
      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 1600px">
          <q-card>
            <div class="q-pa-md" style="max-width: 16000px">
              <q-form @submit="onSubmit" class="q-gutter-md">
                <h4>Character: {{ charSpells.name }}</h4>
                <div class="row no-wrap">
                  <q-input
                    filled
                    v-model="charSpells.baseStat"
                    label="Base Stat"
                  />
                  <q-input
                    filled
                    v-model="charSpells.spellAttackBonus"
                    label="Spell Attack Bonus"
                    type="number"
                  />
                  <q-input
                    filled
                    v-model="charSpells.spellSaveDc"
                    label="Spell save dc"
                    type="number"
                  />
                </div>
                <div>
                  <q-list bordered separator class="q-mt-md">
                    <q-item
                      v-ripple
                      active-class="bg-teal-1"
                      v-for="(spellSlot, index) in charSpells.spellSlots"
                    >
                      <q-item-section>
                        <div class="row no-wrap">
                          <q-input
                            filled
                            v-model="spellSlot.level"
                            label="Level"
                            type="number"
                          />
                          <q-input
                            filled
                            v-model="spellSlot.total"
                            label="Total"
                            type="number"
                          />
                          <q-input
                            filled
                            v-model="spellSlot.used"
                            label="Used"
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
                        v-on:click="deleteSpellSlot(index)"
                      />
                    </q-item>
                  </q-list>
                  <q-btn v-on:click="addSpellSlot()"> Add Spell Slots</q-btn>
                </div>

                <q-card>
                  <q-card-section>
                    <h4>Selected Spells</h4>
                    <div v-if="charSpells.spells.length === 0">
                      <h4>No spells added yet</h4>
                    </div>
                    <q-list bordered separator class="q-mt-md" v-else>
                      <q-item
                        v-ripple
                        active-class="bg-teal-1"
                        v-for="(spell, index) in charSpells.spells"
                      >
                        <q-item-section>
                          <q-item-label>{{ spell }}</q-item-label>
                        </q-item-section>
                        <q-btn
                          size="12px"
                          flat
                          dense
                          round
                          icon="delete"
                          v-on:click="deleteSpell(index, spell)"
                        />
                      </q-item>
                    </q-list>
                  </q-card-section>
                  <q-card-section>
                    <q-input
                      filled
                      label="Spell"
                      :rules="[]"
                      v-model="newSpell"
                    />
                    <q-btn v-on:click="searchSpell(newSpell)">
                      Search spell
                    </q-btn>
                    <div v-if="spellsFound.length === 0">
                      <h4>No Results Found</h4>
                    </div>
                    <q-list bordered separator class="q-mt-md" v-else>
                      <q-item
                        v-ripple
                        active-class="bg-teal-1"
                        v-for="(spellFound, index) in spellsFound"
                      >
                        <q-item-section
                          @click="
                            showDialog(
                              spellsFound[index],
                              spellsFoundDescription[index]
                            )
                          "
                        >
                          <q-item-label>{{ spellFound }}</q-item-label>
                        </q-item-section>
                        <q-btn
                          size="12px"
                          flat
                          dense
                          round
                          icon="add"
                          v-on:click="addSpell(index, spellFound)"
                        />
                      </q-item>
                    </q-list>
                  </q-card-section>
                </q-card>
                <q-btn label="Submit" size="lg" type="submit" color="accent" />
              </q-form>
            </div>
          </q-card>
        </div>
      </div>

      <q-dialog v-model="dialog">
        <q-card>
          <q-card-section class="row items-center">
            <div class="text-h6">{{ tempSpellName }}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section>
            {{ tempSpellDescription }}
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
      tempSpellName: "",
      tempSpellDescription: "",
      spellsFound: [],
      spellsFoundBase: [],
      spellsFoundDescription: [],
      newSpell: "",
      charSpells: {
        name: "",
        baseStat: "",
        spellAttackBonus: 0,
        spellSaveDc: 0,
        spellSlots: [],
        spells: [],
      },
      characterName: "general"
    };
  },
  mounted() {
    this.characterName = this.$route.params.charName;
    this.getCharacterByName(this.characterName);
  },
  methods: {
    showDialog(spellName, spellDescription) {
      this.tempSpellName = spellName;
      this.tempSpellDescription = spellDescription;
      this.dialog = true;
    },
    onSubmit() {
      this.$store.dispatch("updateCharacterSpells", {
        spells: this.charSpells,
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
        this.charSpells = {
          name: characterName,
          baseStat: char.spells.baseStat,
          spellAttackBonus: char.spells.spellAttackBonus,
          spellSaveDc: char.spells.spellSaveDc,
          spellSlots: char.spells.spellSlots,
          spells: char.spells.spells
        };
        notifications.methods.sendSuccessNotification(
          "Spell number: " + char.spells.length
        );
      } else {
        notifications.methods.sendErrorNotification(
          "Haven't found character " + characterName
        );
      }
    },

    deleteSpell(index, spellName) {
      this.charSpells.spells.splice(index, 1);
      if (this.spellsFoundBase.includes(spellName)) {
        this.spellsFound.push(spellName);
      }
    },
    deleteSearchedSpell(index) {
      this.spellsFound.splice(index, 1);
    },
    addSpell(index, spellName) {
      if (this.charSpells.spells.includes(spellName) === false) {
        this.charSpells.spells.push(spellName);
        this.deleteSearchedSpell(index);
      } else {
        notifications.methods.sendErrorNotification(
          "Cannot add duplicate spell"
        );
      }
    },
    searchSpell(spellName) {
      notifications.methods.sendSuccessNotification(spellName);
      var targetURL =
        "api/api/v1/scenario/" + this.$store.getters.getScenarioKey + "/spell";
      axios
        .get(targetURL, {
          headers: { Authorization: "bearer " + this.$store.getters.loggedIn },
          params: {
            name: spellName
          }
        })
        .then(response => {
          this.spellsFound = [];
          var resp = response.data;
          this.spellsFoundBase = [];
          this.spellsFoundDescription = [];
          if (resp.length === 0) {
            notifications.methods.sendErrorNotification("No spells found");
          }
          for (var i = 0; i < resp.length; i++) {
            this.spellsFoundBase.push(
              stringFunc.methods.capitalizeFirstLetter(resp[i].name)
            );
            if (
              this.charSpells.spells.includes(resp[i].name) === false &&
              resp[i].visible === true
            ) {
              this.spellsFound.push(
                stringFunc.methods.capitalizeFirstLetter(resp[i].name)
              );
              this.spellsFoundDescription.push(
                stringFunc.methods.capitalizeFirstLetter(resp[i].description)
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

    addSpellSlot() {
      this.charSpells.spellSlots.push({
        level: 0,
        total: 0,
        used: 0
      });
    },
    deleteSpellSlot(index) {
      this.charSpells.spellSlots.splice(index, 1);
    }
  }
};
</script>
