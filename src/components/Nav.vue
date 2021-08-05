<template>
  <b-navbar>
    <template slot="brand"> </template>
    <template slot="start"> </template>

    <template slot="end">
      <b-navbar-item tag="div" v-if="logged == false">
        <div class="buttons">
          <router-link to="/signup">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
          </router-link>
        </div>
      </b-navbar-item>
      <b-navbar-item @click="logout" v-else>
        <a class="button is-info">
        Logout
        </a>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
import { removeToken } from "../utils/auth";
export default {
  data() {
    return {
      logged: "false",
    };
  },
  computed: {
    loggedin() {
      return localStorage.getItem("loggedin");
    },
  },
  mounted() {
    EventBus.$on("loggedin", () => {
      this.logged = true;
    });
    EventBus.$on("loggedout", () => {
      this.logged = false;
    });
  },

  methods: {
    async logout() {
      await this.$axios
        .post("auth/logout")
        .then((res) => {
          removeToken();
          localStorage.setItem("loggedin", false);
          EventBus.$emit("loggedout");
          this.$router.push("/");
        })
        .catch((error) => {
          Vue.$toast.open({
            message: "Server error",
            type: "error",
          });
        });
    },
  },
  watch: {},
};
</script>

<style></style>
