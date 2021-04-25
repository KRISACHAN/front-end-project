import { defineComponent } from 'vue';
import '@/styles/app.css';

export default defineComponent({
    render() {
        return (
            <>
                <header class="header">
                    <router-link to="/">首页</router-link>
                    <router-link to="/about">关于</router-link>
                </header>
                <main class="main">
                    <router-view />
                </main>
            </>
        );
    }
});