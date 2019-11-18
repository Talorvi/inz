<template>
  <q-page>
    <div class="row">
      <div class="col-12 bg-secondary q-pa-sm">
        <div class="row justify-center">
          <div class="col-xs-12 col-sm-8">
            <p class="text-accent text-h4 q-pl-lg q-pt-lg text-weight-bold text-uppercase">Test</p>
            <p class="text-white q-pa-lg text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus cursus, urna et semper imperdiet, tortor tortor cursus odio, quis luctus turpis elit hendrerit lorem. Nulla accumsan purus a rhoncus varius. Aenean sapien augue, mattis faucibus rhoncus et, dapibus vitae dolor. Maecenas tincidunt nulla sed elit tempor, ac gravida ante posuere. Phasellus blandit ut sem et scelerisque. Cras eu nisl vehicula, imperdiet odio vel, tempor urna. Nulla facilisi. Maecenas ac nunc ac ligula fermentum lacinia. Quisque pulvinar massa sit amet lacus fringilla efficitur.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-center q-pt-lg">
      <div class="col-xs-12 col-sm-8 q-pa-lg text-justify">
        <div class="row q-col-gutter-xl">
          <div class="col-xs-12 col-sm-4">
            <img src="~assets/together.svg" class="image" />
          </div>
          <div class="col-xs-12 col-sm-8 self-center">
            <p>Duis at mollis diam. Morbi finibus nibh diam, nec fermentum neque facilisis ac. In hendrerit arcu ipsum, luctus faucibus dolor suscipit nec. Nunc a lorem a nunc ultricies consectetur non ac turpis. Ut cursus nisi urna, id pulvinar ligula luctus eget. Ut eget gravida ex. Nulla a justo eu diam aliquam eleifend. Donec pretium a lorem feugiat bibendum. Cras vitae fermentum mauris. Praesent dictum tellus sed purus semper lacinia. Cras arcu leo, porttitor eget odio in, convallis convallis elit. Curabitur a facilisis justo, luctus venenatis ante. Praesent a enim nibh.</p>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-8 q-pa-lg">
        <div class="row justify-around">
          <q-btn color="accent" size="lg" class="col-xs-12 col-md-4 q-mb-sm" @click="$router.push('/register', () => {})">Sign up</q-btn>
          <q-btn color="primary" size="lg" class="col-xs-12 col-md-4" @click="$router.push('/login', () => {})">Sign in</q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Index"
};
</script>

<style scoped>
  .image {
    max-width: 100%;
  }
</style>
