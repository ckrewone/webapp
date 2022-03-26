import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import io from 'socket.io-client';

createApp(App).use(router).mount('#app')

const socket = io('/api', {
    reconnection: false,
    transports: ["websocket", "polling"]
});