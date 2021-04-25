import { createApp } from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App';
import router from './router';
import store from './store';
import globalStore from './utils/globalStore'
import {
    MOUNTED_ELEMENT,
    STORE_NAME
} from './constants';

const unsync = sync(store, router);
unsync();

const app = createApp(App);
app
    .provide(STORE_NAME, globalStore)
    .use(store)
    .use(router)
    .mount(MOUNTED_ELEMENT);