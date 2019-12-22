<template>
  <div class="row">
    <div
      class="col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-6 offset-xs-0 offset-sm-0 offset-md-2 offset-lg-3 offset-xl-3 q-pa-lg"
    >
      <scenario-form />
    </div>
  </div>
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
import scenarioForm from "../../../components/forms/scenario/scenarioForm";
export default {
  name: "Scenario",
  components: { scenarioForm }
};
</script>
