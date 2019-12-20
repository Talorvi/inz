<template>
  <q-page>
    <div class="row">
      <div class="col-12">
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
        <q-separator></q-separator>
        <router-view />
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
import featureForm from "../../../components/forms/features/featureForm";
export default {
  name: "JoinSuccess",
  components: { featureForm },
    data() {
      return {
          tab: "features"
      }
    }
};
</script>
