<template>
  <q-page>
    <div class="row bg-secondary justify-center">
      <div class="col-xs-12 col-sm-8">
        <h4 class="text-accent q-pl-lg text-weight-bold text-uppercase">
          Game Management
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
                    v-model="tabGM"
                    dense
                    class="text-grey"
                    active-color="primary"
                    indicator-color="primary"
                    align="justify"
                    narrow-indicator
                  >
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
                    <q-tab name="players" icon="fas fa-user" label="Players" />
                  </q-tabs>

                  <q-separator></q-separator>

                  <q-tab-panels v-model="tabGM" animated>
                    <q-tab-panel name="abilities">
                      <q-tabs
                        v-model="tabAbilities"
                        dense
                        class="text-grey"
                        active-color="primary"
                        indicator-color="primary"
                        align="justify"
                        narrow-indicator
                      >
                        <q-tab
                          name="features"
                          icon="fas fa-khanda"
                          label="Features"
                        />
                        <q-tab
                          name="languages"
                          icon="fas fa-shield-alt"
                          label="Languages"
                        />
                        <q-tab name="traits" icon="fas fa-cog" label="Traits" />
                        <q-tab
                          name="proficiencies"
                          icon="fas fa-hammer"
                          label="Proficiencies"
                        />
                      </q-tabs>

                      <q-tab-panels v-model="tabAbilities" animated>
                        <q-tab-panel name="features">
                          <feature-form />
                        </q-tab-panel>
                      </q-tab-panels>
                    </q-tab-panel>

                    <q-tab-panel name="equipment">
                      Eq
                    </q-tab-panel>
                    <q-tab-panel name="magic">
                      Sp
                    </q-tab-panel>
                    <q-tab-panel name="players">
                      <OnlineList />
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
import OnlineList from "../../components/scenario/OnlineList";
import featureForm from "../../components/forms/features/featureForm";
export default {
  name: "GameManagement",
  components: { OnlineList, featureForm },
  data() {
    return {
      tabGM: "abilities",
      tabAbilities: "features"
    };
  }
};
</script>
