<template>
  <q-page>
    <div class="row bg-secondary justify-center">
      <div class="col-xs-12 col-sm-8">
        <h4 class="text-accent q-pl-lg text-weight-bold text-uppercase">
          New Character
        </h4>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-8 offset-xs-0 offset-sm-2">
        <div class="row justify-center q-pt-md">
          <div class="col-xs-0 col-sm-4 center-image" style="height: 30rem">
            <span class="helper"></span>
            <img
              src="~src/assets/new_character.svg"
              alt="completed"
              class="completed-image self-center"
            />
          </div>
          <div class="col-xs-12 col-sm-8 self-center">
            <div class="row justify-center">
              <div class="col-12 text-center q-pa-xs-md q-pa-sm-md">
                <create-character-form></create-character-form>
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
import createCharacterForm from "../../../components/forms/character/createCharacterForm";
export default {
  name: "JoinSuccess",
  components: { createCharacterForm }
};
</script>
