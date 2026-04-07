import { createWebHistory, createRouter } from 'vue-router'
import LoginView from "./views/LoginView.vue";
import AdminHomeView from "./views/admin/AdminHomeView.vue";
// import {useUserStore} from "./store/user.ts";
//
// const user = useUserStore()

const routes = [
    { path: '/login', component: LoginView },
    { path: '/admin', component: AdminHomeView },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

// router.beforeEach(async (/* to, from */) => {
//     if (!user.isAuthenticated) {
//         return '/login'
//     }
// })
