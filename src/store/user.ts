import { defineStore } from "pinia"
import { ref, computed } from "vue"
import type { Role, UserAuthInfo } from "../types.ts"

export const useUserStore = defineStore("user", () => {
    // state
    const user = ref<UserAuthInfo | null>(null)
    const isInitialized = ref(false)

    // getters
    const token = computed(() => user.value?.accessToken)
    const role = computed<Role | null>(() => user.value?.role ?? null)
    const isAuthenticated = computed(() => !!token.value)

    // init
    function init() {
        if (isInitialized.value) return

        const storedUser = localStorage.getItem("user")

        if (storedUser) {
            try {
                user.value = JSON.parse(storedUser) as UserAuthInfo
            } catch {
                localStorage.removeItem("user")
            }
        }

        isInitialized.value = true
    }

    // actions
    function setUser(newUser: UserAuthInfo) {
        user.value = newUser
        localStorage.setItem("user", JSON.stringify(newUser))
    }

    function login(newUser: UserAuthInfo) {
        setUser(newUser)
    }

    function logout() {
        user.value = null

        localStorage.removeItem("user")
    }

    return {
        // state
        user,
        token,
        role,
        isInitialized,

        // getters
        isAuthenticated,

        // actions
        init,
        setUser,
        login,
        logout,
    }
})