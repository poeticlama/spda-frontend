import { defineStore } from "pinia"
import { ref } from "vue"

type ProfileDraft = {
    phone: string
    email: string
    address: string
}

export const usePatientStore = defineStore("patient", () => {
    const profileDraft = ref<ProfileDraft>({
        phone: "",
        email: "",
        address: "",
    })

    const statusMessage = ref("")

    function hydrateDraft(payload: Partial<ProfileDraft>) {
        profileDraft.value = {
            phone: payload.phone ?? "",
            email: payload.email ?? "",
            address: payload.address ?? "",
        }
    }

    function setStatusMessage(value: string) {
        statusMessage.value = value
    }

    return {
        profileDraft,
        statusMessage,
        hydrateDraft,
        setStatusMessage,
    }
})

