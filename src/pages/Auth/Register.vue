<template>
  <div class="q-pa-md form">
    <div class="row justify-center">
      <div class="col-12 col-md-8 ">
        <RegisterForm />
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
