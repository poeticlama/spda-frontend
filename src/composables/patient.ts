import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import { getMyCard, updateMyProfile } from "../api/requests.ts"
import type { PatientUpdateRequest } from "../types.ts"

const patientProfileKey = ["patient", "profile"] as const

export function usePatientProfile() {
    return useQuery({
        queryKey: patientProfileKey,
        queryFn: getMyCard,
    })
}

export function useUpdatePatientProfile() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: PatientUpdateRequest) => updateMyProfile(payload),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: patientProfileKey })
        },
    })
}

