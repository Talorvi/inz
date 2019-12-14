<template>
  <div>
    <div class="row bg-secondary justify-center">
      <div class="col-xs-12 col-sm-8">
        <h4 class="text-accent q-pl-lg text-weight-bold text-uppercase">
          Characters
        </h4>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-8 offset-xs-0 offset-sm-2">
        <div class="row justify-center q-pt-md">
          <div class="col-xs-0 col-sm-4 center-image" style="height: 20rem">
            <q-btn
              color="accent"
              class="q-mb-md"
              @click="
                $router.push(
                  '/game/' + $route.params.scenarioKey + '/new-character',
                  () => {}
                )
              "
              >New Character</q-btn
            ><br />
            <span class="helper"></span>
            <img
              src="~src/assets/characters.svg"
              alt="completed"
              class="completed-image self-center"
            />
          </div>
          <div class="col-xs-12 col-sm-8">
            <div class="row">
              <div
                class="col-auto q-pa-xs-md q-pa-sm-md q-pb-md"
                style="width: 100%;"
              >
                <character-picker></character-picker>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import characterPicker from "../../components/characterPicker";
export default {
  name: "CharacterPicker",
  components: { characterPicker }
};
</script>

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
