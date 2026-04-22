import { defineStore } from "pinia"
import { ref } from "vue"
import type { DoctorResponse, PatientResponse } from "../types.ts"

export const useAdminStore = defineStore("admin", () => {
    const createdDoctors = ref<DoctorResponse[]>([])
    const createdPatients = ref<PatientResponse[]>([])
    const statusMessage = ref("")

    function addDoctor(doctor: DoctorResponse) {
        createdDoctors.value = [doctor, ...createdDoctors.value]
        statusMessage.value = `Врач ${doctor.full_name} успешно добавлен.`
    }

    function addPatient(patient: PatientResponse) {
        createdPatients.value = [patient, ...createdPatients.value]
        statusMessage.value = `Пациент ${patient.full_name} успешно добавлен.`
    }

    function clearStatus() {
        statusMessage.value = ""
    }

    return {
        createdDoctors,
        createdPatients,
        statusMessage,
        addDoctor,
        addPatient,
        clearStatus,
    }
})
