<template>
  <div id="app">
    <Navbar @input-data="updateTerm" />
    <router-view :searchTerm="searchTerm" />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import db from "@/firebase/init";

export default {
  name: "App",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      searchTerm: "",
      refreshing: false,
      registration: null
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
    }
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
    db.enablePersistence().catch(err => {
      if (err.code == "failed-precondition") {
        //multiple tab open
        console.log("persistence  failed");
      } else if (err.code == "unimplemented") {
        //lack of browser support
        console.log("persistence is not available");
      }
    });
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/main.scss";

#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  background: #eee;
  margin: 0;
  padding: 0;
  width: 100%;
  height: auto;
}
</style>
