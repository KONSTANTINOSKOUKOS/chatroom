import { createRouter, createWebHistory } from "vue-router";

const routes = [
    // {
    //     path: '/auth',
    //     name: 'Auth',
    //     component: () => import('./components/Auth.vue'),
    // },
    {
        path: '/',
        name: 'Home',
        component: () => import('./components/Home.vue')
    },
    {
        path: '/chat',
        name: 'Chat',
        component: () => import('./components/Chat.vue')
    },
    // {
    //     path: '/user',
    //     name: 'User',
    //     component: () => import('./components/Auth.vue')
    // },
];

export function logoutrouter() {
    router.push({name: 'Auth'});
}

export const router = createRouter({
    routes,
    history: createWebHistory()
});