<template>
  <section>
    <h2 class="has-text-centered">Image management system</h2>

    <div class="columns  is-centered mt-5">
      <div class="column is-4   ">
        <div class="box">
          <b-field label="Email">
            <b-input type="email" v-model="form.email"> </b-input>
          </b-field>
          <b-field label="Password">
            <b-input type="password" v-model="form.password"></b-input>
          </b-field>
          <b-button :loading="isloading" type="is-info" @click="login">Login</b-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
export default {
  name: "login",
  data() {
    return {
      isloading:false,
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      this.isloading=true
      await this.$axios
        .post("/auth/login", this.form)
        .then((res) => {
          localStorage.setItem('token',res.data.access_token)
          localStorage.setItem('loggedin',true)
          localStorage.setItem('user',JSON.stringify(res.data.user))
          EventBus.$emit("loggedin");
          this.$router.push('/home')
          Vue.$toast.open({
              message: 'Logged In successfully',
              type: "success",
            });
        })
        .catch((error) => {
          this.isloading=false
          if (error.response.data.email) {
            Vue.$toast.open({
              message: error.response.data.email[0],
              type: "error",
            });
          }
          if (error.response.data.password) {
            Vue.$toast.open({
              message: error.response.data.password[0],
              type: "error",
            });
          }
        });
    },
  },
};
</script>

<style scoped>
h2
{
  font-size: 30px;
  font-weight:bold;
}
</style>
