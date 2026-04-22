import { createWebHistory, createRouter } from 'vue-router'
import LoginView from "./views/LoginView.vue";
import AdminHomeView from "./views/admin/AdminHomeView.vue";
import {useUserStore} from "./store/user.ts";
import PatientHomeView from "./views/patient/PatientHomeView.vue";
import DoctorHomeView from "./views/doctor/DoctorHomeView.vue";


const routes = [
    { path: '/login', component: LoginView },
    { path: '/admin', component: AdminHomeView },
    { path: '/doctor', component: DoctorHomeView },
    { path: '/patient', component: PatientHomeView },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to/*, from */) => {
    const user = useUserStore()
    if (!user.isAuthenticated && to.path !== '/login') {
        return '/login'
    }
})
