import { defineStore } from "pinia"
import { ref, computed } from "vue"
import type {UserAuthInfo} from "../types.ts";

export const useUserStore = defineStore("user", () => {
    // state
    const user = ref<UserAuthInfo | null>(null)
    const isInitialized = ref(false)

    // getters
    const token = computed(() => user.value?.accessToken)
    const isAuthenticated = computed(() => !!token.value)

    // init
    function init() {
        if (isInitialized.value) return

        const storedUser = localStorage.getItem("user")

        if (storedUser) user.value = JSON.parse(storedUser) as UserAuthInfo

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
        isInitialized,

        // getters
        isAuthenticated,

        // actions
        init,
        setUser,
        login,
        logout
    }
})