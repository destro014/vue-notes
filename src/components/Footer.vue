<template>
  <div class="footer container">
      <div class="copyright">
          &copy; {{year}} @destro014
      </div>
  </div>
</template>

<script>
export default {
    name : 'Footer',
    data(){
        return{
            year: '2019'
        }
    }
}
</script>

<style  lang="scss">
.footer{
    padding:0;
    color: #777;
    text-align: center;
    height: 60px;
    line-height: 60px;
    vertical-align: middle;
    margin-top: 50px;
}
</style>