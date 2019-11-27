<template>
  <div>
    <template>
      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 1600px">
          <q-card>
            <q-tabs
              v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="general" label="General" />
              <q-tab name="abilities" label="Abilities" />
              <q-tab name="spells" label="Spells" />
              <q-tab name="equipment" label="Equipment" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="general">
                <div class="q-pa-md" style="max-width: 16000px">
                  <q-form
                    @submit="onSubmit"
                    @reset="onReset"
                    class="q-gutter-md"
                  >
                    <q-input
                      filled
                      v-model="general.name"
                      label="Your character name *"
                      lazy-rules
                      :rules="[
                        val =>
                          (val && val.length > 0) || 'Please type something'
                      ]"
                    />
                    <div class="row no-wrap">
                      <q-input
                        filled
                        v-model="general.race"
                        label="Race"
                        :rules="[]"
                      />
                      <q-input
                        filled
                        v-model="general.profession"
                        label="Profession"
                        :rules="[]"
                      />
                      <q-input
                        filled
                        type="number"
                        v-model="general.level"
                        label="Level"
                        :rules="[val => val > 0 || 'Level have to be positive']"
                      />
                    </div>

                    <div class="row no-wrap">
                      <q-input
                        filled
                        v-model="general.background"
                        label="Background"
                        :rules="[]"
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
                      <q-input
                        filled
                        v-model="general.alignment"
                        label="Alignment"
                        :rules="[]"
                      />
                    </div>

                    <div class="row no-wrap">
                      <q-input
                        filled
                        style="width: 100px"
                        type="number"
                        v-model="general.attributes.strength"
                        label="Strength"
                        :rules="[]"
                      />
                      <q-input
                        filled
                        style="width: 100px"
                        type="number"
                        v-model="general.attributes.dexterity"
                        label="Dexterity *"
                        :rules="[]"
                      />
                      <q-input
                        filled
                        style="width: 100px"
                        type="number"
                        v-model="general.attributes.constitution"
                        label="Constitution"
                        :rules="[]"
                      />
                      <q-input
                        filled
                        style="width: 100px"
                        type="number"
                        v-model="general.attributes.intelligence"
                        label="Intelligence"
                        :rules="[]"
                      />
                      <q-input
                        filled
                        style="width: 100px"
                        type="number"
                        v-model="general.attributes.wisdom"
                        label="Wisdom"
                        :rules="[]"
                      />
                      <q-input
                        filled
                        style="width: 100px"
                        type="number"
                        v-model="general.attributes.charisma"
                        label="Charisma"
                        :rules="[]"
                      />
                    </div>

                    <div class="row no-wrap">
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
                    </div>

                    <div class="row no-wrap">
                      <q-input
                        filled
                        style="width: 100px"
                        type="number"
                        v-model="general.health.maxHealth"
                        label="Max Hit Points"
                        :rules="[
                          val => val > 0 || 'Max HP must be greater than 0!'
                        ]"
                      />
                      <q-input
                        filled
                        style="width: 100px"
                        type="number"
                        v-model="general.health.actualHealth"
                        label="Current Hit Points"
                        :rules="[]"
                      />
                      <q-input
                        filled
                        style="width: 100px"
                        type="number"
                        v-model="general.health.temporaryHealth"
                        label="Temporary Hit Points"
                        :rules="[]"
                      />
                    </div>
                    <div class="row no-wrap">
                      <q-input
                        filled
                        style="width: 100px"
                        v-model="general.hitDices.dice"
                        label="Hit Dice Type"
                        :rules="[]"
                      />
                      <q-input
                        filled
                        style="width: 100px"
                        type="number"
                        v-model="general.hitDices.total"
                        label="Total Hit Dice"
                        :rules="[]"
                      />
                      <q-input
                        filled
                        style="width: 100px"
                        type="number"
                        v-model="general.hitDices.used"
                        label="Used Hit Dice"
                        :rules="[]"
                      />
                    </div>
                    <div class="row no-wrap">
                      <q-input
                        filled
                        style="width: 100px"
                        type="number"
                        v-model="general.initiative"
                        label="Initiative"
                        :rules="[]"
                      />
                      <q-input
                        filled
                        style="width: 100px"
                        v-model="general.speed"
                        label="Speed"
                        :rules="[]"
                      />
                    </div>
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
                </div>
              </q-tab-panel>

              <q-tab-panel name="abilities">
                <div class="text-h6">Alarms</div>
                <q-form
                  @submit="onSubmit"
                  @reset="onReset"
                  class="q-gutter-md"
                >
                  <q-input
                    filled
                    v-model="feature.name"
                    label="Name"
                    :rules="[]"
                  />
                  <q-input
                    filled
                    v-model="feature.description"
                    label="Descrption"
                    :rules="[]"
                  />
                  <q-toggle
                    v-model="feature.visible"
                    color="green"
                    label="Visible"
                  />
                </q-form>
              </q-tab-panel>

              <q-tab-panel name="spells">
                <div class="text-h6">Movies</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </q-tab-panel>
              <q-tab-panel name="equipment">
                <div class="text-h6">Movies</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </q-tab-panel>
            </q-tab-panels>
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
        armorClass : 1
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
      this.$store.dispatch("createCharacter", {general: this.general, scenarioKey: "TESTSCEN"});
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
