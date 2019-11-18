<template>
  <div>
    <div class="row bg-primary justify-center">
      <div class="col-xs-12 col-sm-8">
        <h3 class="text-accent q-pl-lg text-weight-bold">Sign in</h3>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12 col-md-8 ">
        <LoginForm class="q-pl-lg q-pt-lg" />
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "../../components/auth/LoginForm.vue";
export default {
  name: "Login",
  components: {
    LoginForm
  }
};
</script>

