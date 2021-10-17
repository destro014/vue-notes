<template>
  <div id="app">
    <Loader v-if="loader" />
    <div v-else>
      <Navbar @input-data="updateTerm" />
      <Updater />
      <router-view :searchTerm="searchTerm" />
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import Updater from "@/components/Updater.vue";

import db from "@/firebase/init";
import { enableIndexedDbPersistence } from "firebase/firestore";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
    Loader,
    Updater,
  },
  data() {
    return {
      searchTerm: "",
      refreshing: false,
      registration: null,
      loader: false,
    };
  },
  methods: {
    updateTerm(variable) {
      this.searchTerm = variable;
    },
    refreshApp(e) {
      this.registration = e.detail;
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      this.registration.waiting.postMessage("skipWaiting");
    },
  },
  created() {
    document.addEventListener("swUpdated", this.refreshApp, { once: true });
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (this.refreshing) return;
        console.log("refreshing refreshing refreshing");
        this.refreshing = true;
        window.location.reload();
      });
    }
    enableIndexedDbPersistence(db).catch(err => {
      if (err.code == "failed-precondition") {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
      } else if (err.code == "unimplemented") {
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
      }
    });
  },
  mounted() {
    this.loader = true;
  },
  watch: {
    $route(to, from) {
      document.title = to.params.note_slug
        ? to.params.note_slug + " || " + to.meta.title
        : to.meta.title;
      this.loader = false;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/main.scss";
</style>
