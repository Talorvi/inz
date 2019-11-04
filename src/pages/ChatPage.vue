<template>
  <div class="q-pa-md form">
    <div class="row justify-center">
      <div class="col-12 col-md-8 ">
        <chatForm />
      </div>
    </div>
  </div>
</template>

<script>
  import chatForm from "../components/chatForm.vue";
  export default {
    name: "Chat",
    components: {
      chatForm
    }
  };
</script>

<style scoped>
  .form {
    margin-top: 2em;
  }
</style>
