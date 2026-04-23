<script setup lang="ts">
import { ref, watch } from "vue"
import { usePatientProfile, useUpdatePatientProfile } from "../../composables/patient.ts"
import { usePatientStore } from "../../store/patient.ts"
import { parseApiError } from "../../utils/apiError.ts"
import { formatDateRu } from "../../utils/dateFormat.ts"

const patientStore = usePatientStore()
const patientProfileQuery = usePatientProfile()
const updateProfileMutation = useUpdatePatientProfile()
const errorMessage = ref("")

watch(
  () => patientProfileQuery.data.value,
  (card) => {
    if (!card) return

    patientStore.hydrateDraft({
      phone: card.personal_data.phone,
      email: card.personal_data.email,
      address: card.personal_data.address,
    })
  },
  { immediate: true },
)

function submitProfile() {
  patientStore.setStatusMessage("")
  errorMessage.value = ""

  updateProfileMutation.mutate(
    {
      phone: patientStore.profileDraft.phone,
      email: patientStore.profileDraft.email,
      address: patientStore.profileDraft.address,
    },
    {
      onSuccess: () => {
        patientStore.setStatusMessage("Профиль успешно обновлен.")
      },
      onError: (error) => {
        errorMessage.value = parseApiError(error, "Не удалось обновить профиль.")
      },
    },
  )
}
</script>

<template>
  <div class="grid gap-6 lg:grid-cols-3">
    <section class="aero-panel card rounded-2xl lg:col-span-1">
      <div class="card-body gap-2 p-5 text-sm md:p-6">
        <h2 class="card-title">Моя карточка</h2>
        <p v-if="patientProfileQuery.isLoading.value" class="text-base-content/70">Загрузка данных...</p>
        <template v-else-if="patientProfileQuery.data.value">
          <p><strong>ФИО:</strong> {{ patientProfileQuery.data.value.personal_data.full_name }}</p>
          <p><strong>Дата рождения:</strong> {{ formatDateRu(patientProfileQuery.data.value.personal_data.date_of_birth) }}</p>
          <p><strong>Пол:</strong> {{ patientProfileQuery.data.value.personal_data.gender === "male" ? "Мужской": "Женский"}}</p>
          <p><strong>Полис:</strong> {{ patientProfileQuery.data.value.personal_data.insurance_number }}</p>
          <p><strong>Врач:</strong> {{ patientProfileQuery.data.value.assigned_doctor_id ? "Назначен" : "Не назначен" }}</p>
        </template>
      </div>
    </section>

    <section class="aero-panel card rounded-2xl lg:col-span-2">
      <div class="card-body gap-4 p-5 md:p-6">
        <h2 class="card-title">Контактные данные</h2>
        <form class="mt-2 grid gap-3 md:grid-cols-2" @submit.prevent="submitProfile">
          <input
            :value="patientStore.profileDraft.phone"
            class="input input-bordered"
            placeholder="Телефон"
            @input="patientStore.profileDraft.phone = ($event.target as HTMLInputElement).value"
          />
          <input
            :value="patientStore.profileDraft.email"
            type="email"
            class="input input-bordered"
            placeholder="Email"
            @input="patientStore.profileDraft.email = ($event.target as HTMLInputElement).value"
          />
          <textarea
            :value="patientStore.profileDraft.address"
            class="textarea textarea-bordered md:col-span-2"
            placeholder="Адрес"
            @input="patientStore.profileDraft.address = ($event.target as HTMLTextAreaElement).value"
          />
          <button type="submit" class="btn btn-primary md:col-span-2" :disabled="updateProfileMutation.isPending.value">
            <span v-if="updateProfileMutation.isPending.value" class="loading loading-spinner loading-xs" />
            <span>Сохранить изменения</span>
          </button>
        </form>
        <div v-if="patientStore.statusMessage" class="alert alert-success mt-3 py-2 text-sm">
          <span>{{ patientStore.statusMessage }}</span>
        </div>
        <div v-if="errorMessage" class="alert alert-error mt-3 py-2 text-sm">
          <span>{{ errorMessage }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

