import Vue from 'vue'
import App from './App.vue'
import store from "@/store/store";

Vue.config.productionTip = false

export const ApiUrl = process.env.VUE_APP_API_URL;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
