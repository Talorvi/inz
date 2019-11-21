<template>
  <div>
    <div class="row bg-secondary justify-center">
      <div class="col-xs-12 col-sm-8">
        <h4 class="text-accent q-pl-lg text-weight-bold text-uppercase">Sign up</h4>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12 col-md-8 ">
        <RegisterForm class="q-pl-lg q-pt-lg" />
      </div>
    </div>
  </div>
</template>

<script>
import RegisterForm from "../../components/auth/RegisterForm.vue";
export default {
  name: "Register",
  components: {
    RegisterForm
  }
};
</script>

<style scoped>
.form {
  margin-top: 2em;
}
</style>
