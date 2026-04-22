import { computed, type Ref } from "vue"
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import {
    addMedicalRecord,
    addPrescription,
    assignPatient,
    getPatientCard,
    listAvailablePatients,
    listPatients,
} from "../api/requests.ts"
import type { MedicalRecordCreateRequest, PrescriptionCreateRequest } from "../types.ts"

export const doctorQueryKeys = {
    patients: ["doctor", "patients"] as const,
    availablePatients: ["doctor", "available-patients"] as const,
    patientCard: (patientId: string) => ["doctor", "patient-card", patientId] as const,
}

export function usePatientList() {
    return useQuery({
        queryKey: doctorQueryKeys.patients,
        queryFn: listPatients,
    })
}

export function useAvailablePatients() {
    return useQuery({
        queryKey: doctorQueryKeys.availablePatients,
        queryFn: listAvailablePatients,
    })
}

export function useAssignPatient() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (patientId: string) => assignPatient(patientId),
        onSuccess: (_data, patientId) => {
            void queryClient.invalidateQueries({ queryKey: doctorQueryKeys.patients })
            void queryClient.invalidateQueries({ queryKey: doctorQueryKeys.availablePatients })
            void queryClient.invalidateQueries({ queryKey: doctorQueryKeys.patientCard(patientId) })
        },
    })
}

export function usePatientCard(patientId: Ref<string | null>) {
    const patientCardKey = computed(() =>
        patientId.value ? doctorQueryKeys.patientCard(patientId.value) : ["doctor", "patient-card", "none"] as const,
    )

    return useQuery({
        queryKey: patientCardKey,
        queryFn: () => getPatientCard(patientId.value as string),
        enabled: computed(() => !!patientId.value),
    })
}

export function useAddMedicalRecord() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ patientId, payload }: { patientId: string; payload: MedicalRecordCreateRequest }) =>
            addMedicalRecord(patientId, payload),
        onSuccess: (_data, variables) => {
            void queryClient.invalidateQueries({ queryKey: doctorQueryKeys.patientCard(variables.patientId) })
            void queryClient.invalidateQueries({ queryKey: doctorQueryKeys.patients })
        },
    })
}

export function useAddPrescription() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ patientId, payload }: { patientId: string; payload: PrescriptionCreateRequest }) =>
            addPrescription(patientId, payload),
        onSuccess: (_data, variables) => {
            void queryClient.invalidateQueries({ queryKey: doctorQueryKeys.patientCard(variables.patientId) })
            void queryClient.invalidateQueries({ queryKey: doctorQueryKeys.patients })
        },
    })
}

