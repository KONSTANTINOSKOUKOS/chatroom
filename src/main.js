import { createApp } from "vue";
import App from "./App.vue";
import "./assets/base.css";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./components/Auth.vue')
    },
    {
        path: '/auth',
        name: 'Auth',
        component: () => import('./components/Auth.vue')
    },
    {
        path: '/superchat',
        name: 'Superchat',
        component: () => import('./components/Chat.vue')
    },
];

const router = createRouter({
    routes,
    history: createWebHistory()
});

createApp(App)
// .use(router)
.mount("#app");
