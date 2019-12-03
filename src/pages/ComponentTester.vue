<template>
  <div class="q-pa-md form">
    <div class="row justify-center">
      <div class="col-12 col-md-8 ">
        <ChatForm></ChatForm>
        <Picker></Picker>
        <CreateCharacter></CreateCharacter>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
  import ChatForm from "../components/chatForm";
  import Picker from "../components/characterPicker";
  import CreateCharacter from "../components/forms/character/createCharacterForm";
  import notifications from "../functions/notifications";
export default {
  name: "Test",
  components: { ChatForm,Picker, CreateCharacter },
  mounted(){
    notifications.methods.sendSuccessNotification("Mounted test Compo");
    this.$store.dispatch("connectToScenario","TESTSCEN");
  }
};
</script>

<style scoped>
.form {
  margin-top: 2em;
}
</style>
