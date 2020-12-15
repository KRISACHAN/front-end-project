<template>
  <div id="app">
    <h1>vue app 1</h1>
    <p>message: {{ message }}</p>
  </div>
</template>

<script>

export default {
  name: 'vueApp1',
  props: ['message'],
  mounted() {
    if (!window.ENV) {
      window.ENV = {}
    }
    window.ENV.APP_NAME = 'VUE-APP-1'
    console.log(window.ENV)
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
