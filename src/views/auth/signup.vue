<template>
  <section>
    <div class="columns  is-centered mt-5">
      <div class="column is-4   ">
        <div class="box">
          <b-field label="Name">
            <b-input type="text" v-model="form.name"> </b-input>
          </b-field>
          <b-field label="Email">
            <b-input type="email" v-model="form.email"> </b-input>
          </b-field>
          <b-field label="Password">
            <b-input type="password" v-model="form.password"></b-input>
          </b-field>
          <b-button :loading="isloading" type="is-info" @click="signup"
            >Signup</b-button
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
export default {
  name: "signup",
  data() {
    return {
      isloading: false,
      form: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async signup() {
      this.isloading = true;
      await this.$axios
        .post("/auth/register", this.form)
        .then((res) => {
          Vue.$toast.open({
            message: res.data.message,
            type: "success",
          });
          this.isloading = false;
          this.$router.push("/login");
        })
        .catch((error) => {
          this.isloading = false;
          console.log(error.response.data);
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
          if (error.response.data.name) {
            Vue.$toast.open({
              message: error.response.data.name[0],
              type: "error",
            });
          }
        });
    },
  },
};
</script>

<style></style>
