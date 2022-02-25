import {
    createRouter,
    createWebHashHistory,
} from 'vue-router'
import Home from '../pages/home.vue'
import About from '../pages/about.vue'
import Todos from '../pages/todos.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/todos',
        name: 'Todos',
        component: Todos
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
