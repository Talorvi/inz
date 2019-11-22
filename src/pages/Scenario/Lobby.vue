<template>
  <q-page>
    <div class="row bg-secondary justify-center">
      <div class="col-xs-12 col-sm-8">
        <h4 class="text-accent q-pl-lg text-weight-bold text-uppercase">
         Lobby
        </h4>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-8 offset-xs-0 offset-sm-2">
        <PasswordForm></PasswordForm>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-8 offset-xs-0 offset-sm-2">
        <OnlineList></OnlineList>
      </div>
    </div>
  </q-page>
</template>

<script>
import PasswordForm from "../../components/scenario/PasswordForm";
import OnlineList from "../../components/scenario/OnlineList";
export default {
  name: "Lobby",
  components: { PasswordForm, OnlineList },
  beforeCreate(){
    this.$store.dispatch("connectToScenario", this.$route.params.scenarioKey);
  }
};
</script>
