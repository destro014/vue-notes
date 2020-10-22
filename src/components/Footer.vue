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

<style lang="scss">
.footer {
  padding: 0;
  color: #777;
  text-align: center;
  height: 60px;
  line-height: 60px;
  vertical-align: middle;
  margin-top: 50px;
}
</style>
