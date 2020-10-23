<template>
  <div class="footer container">
    <div class="copyright">
      &copy; {{ year }}
      <a
        href="https://pramodpoudel.com.np"
        _target="blank"
        rel="noreferrer noopener"
        >@destro014</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>

<style lang="scss"></style>
