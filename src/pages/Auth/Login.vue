<template>
  <div>
    <div class="row bg-secondary justify-center">
      <div class="col-xs-12 col-sm-8">
        <h4 class="text-accent q-pl-lg text-weight-bold text-uppercase">
          Sign in
        </h4>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12 col-md-8 ">
        <LoginForm class="q-pl-lg q-pr-lg q-pt-lg" />
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
