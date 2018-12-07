<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <MainPage></MainPage>
    <!--<hello-bar-code-scanner></hello-bar-code-scanner>-->
  </div>
</template>

<script>
import MainPage from "./mainPage/MainPage";
import HelloBarCodeScanner from "./components/HelloBarCodeScanner";

export default {
  name: 'app',
  components: {
    HelloBarCodeScanner,
    MainPage
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  text-align: center;
  color: #2c3e50;
  height: 700px;
  /*margin-top: 10px;*/
}

html,body,#app {height: 100%;}
</style>
