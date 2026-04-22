import { useMutation } from "@tanstack/vue-query"
import { createDoctor, createPatient } from "../api/requests.ts"
import type { DoctorCreateRequest, PatientCreateRequest } from "../types.ts"

export function useCreateDoctor() {
    return useMutation({
        mutationFn: (payload: DoctorCreateRequest) => createDoctor(payload),
    })
}

export function useCreatePatient() {
    return useMutation({
        mutationFn: (payload: PatientCreateRequest) => createPatient(payload),
    })
}

