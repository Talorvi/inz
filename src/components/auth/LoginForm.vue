<template>
  <div>
    <h1>LoginForm</h1>
  </div>
</template>

<script>
  export default {
    name: 'LoginForm',
    data() {
      return {
        form: {
          name: '',
          password: '',
        }
      }
    }
  }
</script>

<style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
