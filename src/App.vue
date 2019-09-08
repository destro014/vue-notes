<template>
  <div id="app">
    <Navbar @inputData="updateTerm"/>
    <router-view :searchTerm="searchTerm"/>
    <Footer />
  </div>
</template>

<script>

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components :{
    Navbar, Footer
  },
  data(){
    return{
        searchTerm: '',
    }
  },
  methods:{
    updateTerm(variable){
      this.searchTerm = variable
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';

#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  background: #f8f9fa;
  margin: 0;
  padding : 0;
  width:100%;
  height: auto;
}

</style>
