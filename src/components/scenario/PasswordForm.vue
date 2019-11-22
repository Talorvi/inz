<template>
  <div class="row justify-center q-pt-md">
    <div class="col-xs-0 col-sm-4 center-image" style="height: 20rem">
      <span class="helper"></span>
      <img
        src="~src/assets/change_room_password.svg"
        alt="completed"
        class="completed-image self-center"
      />
    </div>
    <div class="col-xs-12 col-sm-8 self-center">
      <div class="row justify-center">
        <q-card
          flat
          style="max-width: 30rem; margin-left: auto; margin-right: auto;"
          class="q-pt-lg"
        >
          <q-form @submit="onSubmit">
            <q-card-section class="q-px-lg q-pt-lg q-pb-none">
              <q-input
                v-model="password"
                filled
                type="password"
                label="Password"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <q-card-actions align="center" class="q-pa-sm">
                <q-btn
                  class="text-weight-bold"
                  type="submit"
                  flat
                  size="lg"
                  label="Join"
                  color="accent"
                />
              </q-card-actions>
            </q-card-section>
          </q-form>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PasswordForm"
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
