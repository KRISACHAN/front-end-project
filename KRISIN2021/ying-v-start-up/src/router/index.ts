import {
    createRouter,
    createWebHistory,
    RouteRecordRaw,
    RouterOptions,
    Router,
    RouterHistory,
} from 'vue-router';
import { DefaultObjectType } from '../global';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'index',
        component: () => import('../views/index'),
        props: true,
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/about'),
        props: true,
    },
];
const history: RouterHistory = createWebHistory();

history.listen((to, from, info) => {
    const dirLog: DefaultObjectType = {
        '': '？',
        back: '⏪',
        forward: '⏩',
    }
    console.log(`${dirLog[info.direction]} as a ${info.type}`)
});
  
const routerConfig: RouterOptions = {
    strict: true,
    history,
    routes,
};

const router: Router = createRouter(routerConfig);

router.beforeEach((to, from, next) => {
    next();
});

router.afterEach((to, from): void => {});
  
export default router;