// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

import "normalize.css";

//create global filter
// Vue.filter("snippet", val => {
//   if (!val || typeof val != "string") return "";
//   val = val.slice(0, 50);
//   return val;
// });

createApp(App)
  .use(router)
  .mount("#app");
