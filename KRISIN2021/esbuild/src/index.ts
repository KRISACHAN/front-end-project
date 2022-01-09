import Component from './hello-world.vue';
import Vue from 'vue';

new Vue({
    el: '#app',
    render: h => h(Component),
});