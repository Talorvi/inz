<template>
  <div class="login">
    <router-link to="/">Home</router-link>
    <div><LoginForm /></div>
  </div>
</template>

<script>
  import LoginForm from '../components/auth/LoginForm.vue'
  export default {
    name: 'login',
    components: {
      LoginForm
    }
  }
</script>
