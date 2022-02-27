<template>
    <div>
        <router-link to="/">首页</router-link> | 
        <router-link to="/about">关于</router-link> | 
        <router-link to="/todos">todos</router-link> | 
        <router-link to="/counter">counter</router-link> | 
    </div>
    <router-view />
</template>

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
