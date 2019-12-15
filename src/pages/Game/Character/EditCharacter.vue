<template>
  <q-page>
    <div class="row bg-secondary justify-center">
      <div class="col-xs-12 col-sm-8">
        <h4 class="text-accent q-pl-lg text-weight-bold text-uppercase">
          Edit Character
        </h4>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-8 offset-xs-0 offset-sm-2">
        <div class="row justify-center q-pt-md">
          <div class="col-xs-12 col-sm-8 self-center">
            <div class="row justify-center">
              <div class="col-12 text-center q-pa-xs-md q-pa-sm-md">
                <q-card flat>
                  <q-tabs
                    v-model="tabMain"
                    dense
                    class="text-grey"
                    active-color="primary"
                    indicator-color="primary"
                    align="justify"
                    narrow-indicator
                  >
                    <q-tab
                      name="statistics"
                      icon="fas fa-scroll"
                      label="Statistics"
                    />
                    <q-tab
                      name="abilities"
                      icon="fas fa-book"
                      label="Abilities"
                    />
                    <q-tab
                      name="equipment"
                      icon="fas fa-box"
                      label="Equipment"
                    />
                    <q-tab
                      name="magic"
                      icon="fas fa-hat-wizard"
                      label="Magic"
                    />
                  </q-tabs>

                  <q-separator></q-separator>

                  <q-tab-panels v-model="tabMain" animated>
                    <q-tab-panel name="statistics">
                      <update-character-general-info />
                    </q-tab-panel>
                    <q-tab-panel name="abilities">
                      <update-character-abilities />
                    </q-tab-panel>
                    <q-tab-panel name="equipment">
                      <update-character-equipment />
                    </q-tab-panel>
                    <q-tab-panel name="magic">
                      <update-character-spells />
                    </q-tab-panel>
                  </q-tab-panels>

                </q-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.completed-image {
  width: 100%;
  vertical-align: middle;
}
.center-image {
  white-space: nowrap;
  text-align: center;
  margin: 1em 0;
}
.helper {
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
</style>

<script>
import updateCharacterSpells from "../../../components/forms/character/updateCharacterSpells";
import updateCharacterGeneralInfo from "../../../components/forms/character/updateCharacterGeneralInfo";
import updateCharacterEquipment from "../../../components/forms/character/updateCharacterEquipment";
import updateCharacterAbilities from "../../../components/forms/character/updateCharacterAbilities";
export default {
  name: "JoinSuccess",
  components: { updateCharacterGeneralInfo, updateCharacterSpells, updateCharacterEquipment, updateCharacterAbilities },
  data() {
    return {
      tabMain: "statistics"
    };
  }
};
</script>
