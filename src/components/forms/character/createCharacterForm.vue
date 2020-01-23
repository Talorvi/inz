<template>
  <div>
    <template>
      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 1600px">
          <q-card flat>
            <div class="q-pa-md">
              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
                style="width:100%;"
              >
                <q-stepper
                  header-nav
                  v-model="step"
                  ref="stepper"
                  color="accent"
                  animated
                  style="width:100%;"
                >
                  <q-step
                    :name="1"
                    title="Base Info"
                    icon="settings"
                    :done="step > 1"
                  >
                    <q-input
                      filled
                      v-model="general.name"
                      label="Name"
                      lazy-rules
                      required="true"
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please type something'
                      ]"
                    />
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
                  </q-step>

                  <q-step
                    :name="2"
                    title="Background"
                    icon="settings"
                    :done="step > 1"
                  >
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
                      :rules="[val => val > 0 || 'Level have to be positive']"
                    />
                    <q-input
                      filled
                      type="number"
                      v-model="general.experience"
                      label="Experience "
                      :rules="[
                        val => val >= 0 || 'Experience have to be positive'
                      ]"
                    />
                  </q-step>

                  <q-step
                    :name="3"
                    title="Stats"
                    icon="settings"
                    :done="step > 2"
                  >
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
                  </q-step>

                  <q-step
                    :name="4"
                    title="Health"
                    icon="settings"
                    :done="step > 3"
                  >
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
                    <q-separator class="q-mb-md"></q-separator>
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
                  </q-step>

                  <q-step
                    :name="5"
                    title="Proficiencies"
                    icon="settings"
                    :done="step > 4"
                  >
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
                  </q-step>

                  <q-step
                    :name="6"
                    title="Finish"
                    icon="settings"
                    :done="step > 5"
                  >
                    <div>
                      <q-btn label="Finish" size="md" type="submit" color="accent" />
                      <q-btn
                        label="Reset"
                        type="reset"
                        color="primary"
                        flat
                        class="q-ml-sm"
                      />
                    </div>
                  </q-step>
                  <template v-slot:navigation>
                    <q-stepper-navigation>
                      <q-btn v-if="step<6" @click="$refs.stepper.next()" color="accent" label="Continue" />
                      <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
                    </q-stepper-navigation>
                  </template>
                </q-stepper>
              </q-form>
            </div>
          </q-card>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
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
      tab: "general"
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("createCharacter", {
        general: this.general,
        scenarioKey: this.$store.getters.getScenarioKey
      });
      this.$router.go(-1);
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
    }
  }
};
</script>
