<template>
  <div class="nav container">
    <div class="brand">
      <router-link :to="{ name: 'Home' }">
        <img src="@/assets/img/BrandIcon.png" alt="" />
      </router-link>
    </div>
    <div class="search">
      <input
        type="text"
        name="search"
        placeholder="Search..."
        v-model="searchTerm"
        @keyup="submit"
      />
    </div>
    <div class="logout">
      <!-- <router-link :to=> -->
      <img src="@/assets/img/logout.png" alt="" />
      <span>Logout</span>
      <!-- </router-link> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {
      searchTerm: ""
    };
  },
  methods: {
    submit() {
      this.$emit("inputData", this.searchTerm.toLowerCase());
      this.tempMessage = "";
    }
  }
};
</script>

<style lang="scss"></style>
