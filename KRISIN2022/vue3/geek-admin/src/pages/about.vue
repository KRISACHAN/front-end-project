<template>
    <Heading :level="1">hello geekbang</Heading>
    <p>{{ x }}</p>
    <p>{{ y }}</p>
</template>

<script setup>
    import useMouse from '../utils/use-mouse';
    import Heading from '../components/heading.jsx'
    let {x,y} = useMouse()
</script>