<template>
    <h1>这是关于页面</h1>
    <p>{{ x }}</p>
    <p>{{ y }}</p>
</template>

<script setup>
    import useMouse from '../utils/use-mouse';
    let {x,y} = useMouse()
</script>