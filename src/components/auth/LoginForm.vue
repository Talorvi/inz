<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="username"
        label="Username"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Enter username']"
      />

      <q-input
        v-model="password"
        filled
        type="password"
        label="Password"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        username: null,
        password: null,

        accept: false
      }
    },

    methods: {

      onSubmit () {
        // if (this.accept !== true) {
        //   this.$q.notify({
        //     color: 'red-5',
        //     textColor: 'white',
        //     icon: 'warning',
        //     message: 'You need to accept the license and terms first'
        //   })
        // }
        // else {
        //   this.$q.notify({
        //     color: 'green-4',
        //     textColor: 'white',
        //     icon: 'cloud_done',
        //     message: 'Submitted'
        //   })
        // }
        this.$q.notify({
          color: 'green-3',
          textColor: 'white',
          icon: 'warning',
          message: 'Success'
        });
        //this.$store.dispatch('requestToken');

        this.$store.dispatch('retrieveToken',{
          username: this.username,
          password: this.password,
        })
      },
      onReset () {
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
