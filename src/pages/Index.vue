<template>
  <q-page>
    <div class="row">
      <div class="col-12 bg-secondary q-pa-sm">
        <div class="row justify-center">
          <div class="col-xs-12 col-sm-8">
            <p class="text-accent text-h4 q-pl-lg q-pt-lg text-weight-bold text-uppercase">WELCOME!</p>
            <p class="text-white q-pa-lg text-justify">
              Welcome in web assistant to perform online RPG sessions!
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
            <p>To enjoy a joint game with friends, create an account in our application or if you already have one, log in!</p>
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
