import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "@mdi/font/css/materialdesignicons.css";
import { getToken, setToken, removeToken } from "./utils/auth";
Vue.use(Buefy);
window.axios = require("axios");
const $axios = axios.create({
  baseURL: "http://localhost:8000/api",
});
Vue.prototype.$axios = $axios;
$axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + getToken(); // Set JWT token\
    }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

Vue.config.productionTip = false;
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

//laravel echo and pusher setup
import Echo from "laravel-echo";

window.Pusher = require("pusher-js");
const jwtToken=`Bearer ${localStorage.getItem('token')}`
console.log(jwtToken)
window.Echo = new Echo({
  broadcaster: "pusher",
  key: process.env.VUE_APP_WEBSOCKET_KEY,
  wsHost:'127.0.0.1',
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  wssPort: 6001,
  auth: {
    headers: {
      Authorization: jwtToken,
    },
  },
});

Vue.use(VueToast, {
  // One of the options
  position: "top-right",
});
//Vue.$toast.open({/* options */});
let instance = Vue.$toast.open("You did it!");

// Force dismiss specific toast
instance.dismiss();
// Dismiss all opened toast immediately
Vue.$toast.clear();
window.EventBus = new Vue();
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
