<template>
  <div id="app">
    <router-link to="/">首页</router-link>
    <router-link to="/tooltip">Tooltip</router-link>
    <router-link to="/tabs">Tabs</router-link>
    <router-link to="/search">Search</router-link>
    <router-link to="/change">Change</router-link>
    <router-link to="/addnum">Addnum</router-link>
    <transition name="bounce">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  html,body,#app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-out .5s;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes bounce-out {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(0);
    }
  }
</style>
