<template>
  <div>
    <template>
      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 1600px">
          <q-card>
            <div class="q-pa-md" style="max-width: 16000px">
              <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                <h5>Character: {{ general.name }}</h5>

                <q-tabs
                  v-model="tab"
                  dense
                  class="text-grey"
                  active-color="primary"
                  indicator-color="primary"
                  align="justify"
                  narrow-indicator
                >
                  <q-tab
                    name="base"
                    icon="fas fa-user"
                    label="Base info"
                  />
                  <q-tab
                    name="background"
                    icon="fas fa-history"
                    label="Background"
                  />
                  <q-tab name="stats" icon="fas fa-scroll" label="Stats" />
                  <q-tab name="health" icon="fas fa-heart" label="Health" />
                  <q-tab
                    name="proficiencies"
                    icon="fas fa-lightbulb"
                    label="Proficiencies"
                  />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                  <q-tab-panel name="base">
                    <q-card>
                      <q-card-section>
                        <q-input
                          filled
                          v-model="general.race"
                          label="Race"
                          :rules="[]"
                        />
                        <q-input
                          filled
                          v-model="general.alignment"
                          label="Alignment"
                          :rules="[]"
                        />
                        <q-input
                          filled
                          v-model="general.speed"
                          label="Speed"
                          :rules="[]"
                        />
                      </q-card-section>
                    </q-card>
                  </q-tab-panel>

                  <q-tab-panel name="background">
                    <q-card>
                      <q-card-section>
                        <q-input
                          filled
                          v-model="general.profession"
                          label="Profession"
                          :rules="[]"
                        />
                        <q-input
                          filled
                          v-model="general.background"
                          label="Background"
                          :rules="[]"
                        />
                        <q-input
                          filled
                          type="number"
                          v-model="general.level"
                          label="Level"
                          :rules="[
                            val => val > 0 || 'Level have to be positive'
                          ]"
                        />
                        <q-input
                          filled
                          type="number"
                          v-model="general.experience"
                          label="Experience "
                          :rules="[
                            val => val > 0 || 'Experience have to be positive'
                          ]"
                        />
                      </q-card-section>
                    </q-card>
                  </q-tab-panel>

                  <q-tab-panel name="stats">
                    <q-card>
                      <q-card-section>
                        <q-input
                          filled
                          type="number"
                          v-model="general.attributes.strength"
                          label="Strength"
                          :rules="[]"
                        />
                        <q-input
                          filled
                          type="number"
                          v-model="general.attributes.dexterity"
                          label="Dexterity *"
                          :rules="[]"
                        />
                        <q-input
                          filled
                          type="number"
                          v-model="general.attributes.constitution"
                          label="Constitution"
                          :rules="[]"
                        />
                        <q-input
                          filled
                          type="number"
                          v-model="general.attributes.intelligence"
                          label="Intelligence"
                          :rules="[]"
                        />
                        <q-input
                          filled
                          type="number"
                          v-model="general.attributes.wisdom"
                          label="Wisdom"
                          :rules="[]"
                        />
                        <q-input
                          filled
                          type="number"
                          v-model="general.attributes.charisma"
                          label="Charisma"
                          :rules="[]"
                        />
                        <q-separator></q-separator>
                        <q-card-section>
                          <q-input
                            filled
                            type="number"
                            v-model="general.initiative"
                            label="Initiative"
                            :rules="[]"
                          />
                        </q-card-section>
                      </q-card-section>
                    </q-card>
                  </q-tab-panel>

                  <q-tab-panel name="health">
                    <q-card>
                      <q-card-section>
                        <q-input
                          filled
                          type="number"
                          v-model="general.health.maxHealth"
                          label="Max Hit Points"
                          :rules="[
                            val => val > 0 || 'Max HP must be greater than 0!'
                          ]"
                        />
                        <q-input
                          filled
                          type="number"
                          v-model="general.health.actualHealth"
                          label="Current Hit Points"
                          :rules="[]"
                        />
                        <q-input
                          filled
                          type="number"
                          v-model="general.health.temporaryHealth"
                          label="Temporary Hit Points"
                          :rules="[]"
                        />
                      </q-card-section>
                      <q-separator></q-separator>
                      <q-card-section>
                        <q-input
                          filled
                          v-model="general.hitDices.dice"
                          label="Hit Dice Type"
                          :rules="[]"
                        />
                        <q-input
                          filled
                          type="number"
                          v-model="general.hitDices.total"
                          label="Total Hit Dice"
                          :rules="[]"
                        />
                        <q-input
                          filled
                          type="number"
                          v-model="general.hitDices.used"
                          label="Used Hit Dice"
                          :rules="[]"
                        />
                      </q-card-section>
                    </q-card>
                  </q-tab-panel>

                  <q-tab-panel name="proficiencies">
                    <q-card>
                      <q-card-section>
                        <q-input
                          filled
                          type="number"
                          v-model="general.proficiency"
                          label="Proficiency"
                          :rules="[]"
                        />
                        <q-input
                          filled
                          type="number"
                          v-model="general.passivePerception"
                          label="Passive perception"
                          :rules="[]"
                        />
                        <q-input
                          filled
                          type="number"
                          v-model="general.passiveInsight"
                          label="Passive insight"
                          :rules="[]"
                        />
                        <q-input
                          filled
                          type="number"
                          v-model="general.inspiration"
                          label="Inspiration"
                          :rules="[]"
                        />
                      </q-card-section>
                    </q-card>
                  </q-tab-panel>
                </q-tab-panels>

                <div>
                  <q-btn label="Submit" size="lg" type="submit" color="accent" />
                  <q-btn
                    label="Reset"
                    type="reset"
                    color="primary"
                    flat
                    class="q-ml-sm"
                  />
                </div>
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

export default {
  data() {
    return {
      tab: "base",
      general: {
        name: "",
        race: "",
        profession: "",
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
        proficiency: 0,
        passivePerception: 0,
        passiveInsight: 0,
        inspiration: 0,
        health: {
          actualHealth: 0,
          maxHealth: 1,
          temporaryHealth: 0
        },
        hitDices: {
          dice: "",
          total: 0,
          used: 0
        },
        initiative: 0,
        speed: ""
      },
      equipment: {
        armorClass: 1
      },
      feature: {
        name: "",
        description: "",
        visible: false
      },
      characterName: "general"
    };
  },
  mounted() {
    this.characterName = this.$route.params.charName;
    this.getCharacterByName(this.characterName);
    console.log("Chara" + this.characterName);
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
    }
  }
};
</script>
