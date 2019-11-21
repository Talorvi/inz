<template>
  <div class="q-pa-md form">
    <div class="row justify-center">
      <div class="col-12 col-md-8 ">
        <LoginForm />
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

<style scoped>
.form {
  margin-top: 2em;
}
</style>
