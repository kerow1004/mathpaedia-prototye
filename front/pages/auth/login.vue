<template>
  <div>
    <v-form @submit="onSubmit" @reset="onReset" v-if="show">
      <v-text-field
        v-model="form.username"
        label="Username"
        placeholder="Enter Username"
        required
      ></v-text-field>

      <v-text-field
        v-model="form.password"
        label="Password"
        placeholder="Enter password"
        type="password"
        required
      ></v-text-field>

      <v-btn type="submit" color="primary">Login</v-btn>
      <v-btn type="reset" color="danger">Reset</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      show: true,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      this.$store.dispatch('login', { username: this.form.username, password: this.form.password })
        .then((response) => {
          console.log('[Login] login is success', response);
        })
        .catch((error) => {
          console.log('[Login] login is failure', error);
        });
    },
    onReset(evt) {
      evt.preventDefault();

      /* Reset our form values */
      this.form.username = '';
      this.form.password = '';

      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true; });
    },
  },
};
</script>

<style scoped>

</style>
