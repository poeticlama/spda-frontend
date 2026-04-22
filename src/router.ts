import { createWebHistory, createRouter } from "vue-router"
import LoginView from "./views/LoginView.vue"
import AdminHomeView from "./views/admin/AdminHomeView.vue"
import { useUserStore } from "./store/user.ts"
import PatientHomeView from "./views/patient/PatientHomeView.vue"
import DoctorHomeView from "./views/doctor/DoctorHomeView.vue"
import type { Role } from "./types.ts"
import AdminDoctorsView from "./views/admin/AdminDoctorsView.vue"
import AdminPatientsView from "./views/admin/AdminPatientsView.vue"
import AdminActivityView from "./views/admin/AdminActivityView.vue"
import DoctorPatientsView from "./views/doctor/DoctorPatientsView.vue"
import DoctorCareView from "./views/doctor/DoctorCareView.vue"
import PatientProfileView from "./views/patient/PatientProfileView.vue"
import PatientHistoryView from "./views/patient/PatientHistoryView.vue"

const routes = [
    { path: "/", redirect: "/login" },
    {
        path: "/login",
        component: LoginView,
        meta: {
            guestOnly: true,
        },
    },
    {
        path: "/admin",
        component: AdminHomeView,
        meta: {
            requiresAuth: true,
            roles: ["admin"],
        },
        children: [
            { path: "", redirect: "/admin/doctors" },
            { path: "doctors", component: AdminDoctorsView },
            { path: "patients", component: AdminPatientsView },
            { path: "activity", component: AdminActivityView },
        ],
    },
    {
        path: "/doctor",
        component: DoctorHomeView,
        meta: {
            requiresAuth: true,
            roles: ["doctor"],
        },
        children: [
            { path: "", redirect: "/doctor/patients" },
            { path: "patients", component: DoctorPatientsView },
            { path: "care", component: DoctorCareView },
        ],
    },
    {
        path: "/patient",
        component: PatientHomeView,
        meta: {
            requiresAuth: true,
            roles: ["patient"],
        },
        children: [
            { path: "", redirect: "/patient/profile" },
            { path: "profile", component: PatientProfileView },
            { path: "history", component: PatientHistoryView },
        ],
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
]

const roleToDashboard: Record<Role, string> = {
    admin: "/admin",
    doctor: "/doctor",
    patient: "/patient",
}

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to) => {
    const user = useUserStore()
    user.init()

    const requiresAuth = Boolean(to.meta.requiresAuth)
    const guestOnly = Boolean(to.meta.guestOnly)
    const allowedRoles = (to.meta.roles as Role[] | undefined) ?? []

    if (!user.isAuthenticated && requiresAuth) {
        return "/login"
    }

    if (user.isAuthenticated && guestOnly && user.role) {
        return roleToDashboard[user.role]
    }

    if (user.isAuthenticated && allowedRoles.length > 0 && user.role && !allowedRoles.includes(user.role)) {
        return roleToDashboard[user.role]
    }
})
