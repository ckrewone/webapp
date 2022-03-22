import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

import io from 'socket.io-client';
const socket = io('https://3000-ckrewone-webapp-s7ryy2c43eh.ws-eu38.gitpod.io/', {
    reconnection: false,
    transports: ["websocket", "polling"]
});