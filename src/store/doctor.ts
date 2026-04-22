import { defineStore } from "pinia"
import { ref } from "vue"

export const useDoctorStore = defineStore("doctor", () => {
    const selectedPatientId = ref<string | null>(null)
    const patientSearch = ref("")
    const statusMessage = ref("")

    function setSelectedPatientId(patientId: string | null) {
        selectedPatientId.value = patientId
    }

    function setPatientSearch(value: string) {
        patientSearch.value = value
    }

    function setStatusMessage(value: string) {
        statusMessage.value = value
    }

    return {
        selectedPatientId,
        patientSearch,
        statusMessage,
        setSelectedPatientId,
        setPatientSearch,
        setStatusMessage,
    }
})

