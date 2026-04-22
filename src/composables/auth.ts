import { useMutation } from "@tanstack/vue-query"
import { login } from "../api/requests.ts"
import { useUserStore } from "../store/user.ts"
import type { TokenRequest, TokenResponse, UserAuthInfo } from "../types.ts"

const normalizeTokenResponse = (response: TokenResponse): UserAuthInfo => ({
    accessToken: response.access_token,
    tokenType: response.token_type,
    role: response.role,
    profileId: response.profile_id,
})

export function useLogin() {
    const userStore = useUserStore()

    return useMutation({
        mutationFn: (payload: TokenRequest) => login(payload),
        onSuccess: (data) => {
            userStore.login(normalizeTokenResponse(data))
        },
    })
}

