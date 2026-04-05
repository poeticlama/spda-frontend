import { createWebHistory, createRouter } from 'vue-router'
import LoginView from "./views/LoginView.vue";

const routes = [
    { path: '/login', component: LoginView },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
