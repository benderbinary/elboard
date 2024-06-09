import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { useAuthStore } from './stores/authStore';
import { fakeBackend } from '@/helpers/fakeBackend';
import VueDraggableResizable from 'vue-draggable-resizable';
import './assets/vue-draggable-resizable.css';
import './index.css';

fakeBackend();
startApp();

async function startApp() {
    const app = createApp(App);

    app.use(createPinia());
    app.use(router);

    app.component('vue-draggable-resizable', VueDraggableResizable);

    const authStore = useAuthStore();
    try {
        await authStore.refreshToken();
    } catch {
        // TODO: replace comment
    }

    app.mount('#app');
}
