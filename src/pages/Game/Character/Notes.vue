<template>
  <q-page>
    <div class="row bg-secondary justify-center">
      <div class="col-xs-12 col-sm-8">
        <h4 class="text-accent q-pl-lg text-weight-bold text-uppercase">
          Notes
        </h4>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-4 col-lg-2">
        <div class="row justify-center q-pa-lg">
          <q-btn style="width: 100%" size="lg" color="accent" @click="$router.push('/game/' + $route.params.scenarioKey + '/show-note/new' ,() => {})">
            Create
          </q-btn>
        </div>
      </div>
      <div class="col-xs-12 col-sm-8 col-lg-10">
        <div class="row justify-center q-pt-md q-pr-md q-pl-md">
          <div class="col-xs-12 self-center">
            <div class="row justify-center">
              <div class="col-12 text-center q-pa-xs-md q-pa-sm-md">
                <NoteList />
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
import NoteList from "../../../components/NoteList";
export default {
  name: "JoinSuccess",
  components: { NoteList }
};
</script>
