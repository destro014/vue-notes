<template>
  <div class="updater-container" v-if="updateExists">
    <div class="updater">
      <h3>Update available!</h3>
      <p>There is an update available for this website.</p>
      <div class="actions">
        <button class="btn btn-cancel" @click="cancelUpdate">Cancel</button>
        <button class="btn btn-update" @click="refreshApp">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
const body = document.querySelector("body");

export default {
  name: "Updater",
  data() {
    return {
      updateExists: false,
      refreshing: false,
      registration: null,
    };
  },

  methods: {
    showRefreshUI(e) {
      this.registration = e.detail;
      this.updateExists = true;
      body.style.overflow = "hidden";
    },
    refreshApp(e) {
      this.updateExists = false;
      body.style.overflow = "visible";
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      this.registration.waiting.postMessage("skipWaiting");
    },
    cancelUpdate() {
      this.updateExists = false;
      body.style.overflow = "visible";
    },
  },
  created() {
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (this.refreshing) return;
        this.refreshing = true;
        window.location.reload();
      });
    }
  },
};
</script>

<style></style>
