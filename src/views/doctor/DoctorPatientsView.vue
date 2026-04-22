<script setup lang="ts">
import { computed, ref } from "vue"
import { useAssignPatient, useAvailablePatients, usePatientList } from "../../composables/doctor.ts"
import { useDoctorStore } from "../../store/doctor.ts"
import { parseApiError } from "../../utils/apiError.ts"

const doctorStore = useDoctorStore()
const assignedPatientsQuery = usePatientList()
const availablePatientsQuery = useAvailablePatients()
const assignPatientMutation = useAssignPatient()
const errorMessage = ref("")

const filteredAssignedPatients = computed(() => {
  const search = doctorStore.patientSearch.trim().toLowerCase()
  if (!search) {
    return assignedPatientsQuery.data.value ?? []
  }

  return (assignedPatientsQuery.data.value ?? []).filter((patient) =>
    patient.full_name.toLowerCase().includes(search) || patient.insurance_number.toLowerCase().includes(search),
  )
})

function selectPatient(patientId: string) {
  doctorStore.setSelectedPatientId(patientId)
  doctorStore.setStatusMessage("Пациент выбран. Перейдите во вкладку \"Карта и назначения\".")
}

function assignPatientToDoctor(patientId: string) {
  errorMessage.value = ""
  assignPatientMutation.mutate(patientId, {
    onSuccess: () => {
      doctorStore.setStatusMessage("Пациент успешно прикреплен к врачу.")
    },
    onError: (error) => {
      errorMessage.value = parseApiError(error, "Не удалось прикрепить пациента.")
    },
  })
}
</script>

<template>
  <div class="grid gap-6 lg:grid-cols-2">
    <section class="aero-panel card rounded-2xl">
      <div class="card-body gap-4">
        <h2 class="card-title">Мои пациенты</h2>
        <input
          :value="doctorStore.patientSearch"
          class="input input-bordered"
          placeholder="Поиск по ФИО или полису"
          @input="doctorStore.setPatientSearch(($event.target as HTMLInputElement).value)"
        />

        <ul class="max-h-96 space-y-2 overflow-auto text-sm">
          <li
            v-for="patient in filteredAssignedPatients"
            :key="patient.id"
            class="cursor-pointer rounded-lg border p-3 transition hover:border-primary"
            :class="doctorStore.selectedPatientId === patient.id ? 'border-primary bg-primary/10' : 'border-base-300'"
            @click="selectPatient(patient.id)"
          >
            <p class="font-medium">{{ patient.full_name }}</p>
            <p class="text-base-content/70">Полис: {{ patient.insurance_number }}</p>
          </li>
          <li v-if="assignedPatientsQuery.isLoading.value" class="text-base-content/70">Загрузка списка пациентов...</li>
          <li v-if="!assignedPatientsQuery.isLoading.value && filteredAssignedPatients.length === 0" class="text-base-content/70">
            Назначенные пациенты не найдены.
          </li>
        </ul>
      </div>
    </section>

    <section class="aero-panel card rounded-2xl">
      <div class="card-body gap-4">
        <h2 class="card-title">Доступные пациенты</h2>
        <ul class="max-h-96 space-y-2 overflow-auto text-sm">
          <li v-for="patient in availablePatientsQuery.data.value ?? []" :key="patient.id" class="rounded-lg border border-base-300 p-3">
            <p class="font-medium">{{ patient.full_name }}</p>
            <p class="text-base-content/70">Полис: {{ patient.insurance_number }}</p>
            <button
              class="btn btn-primary btn-sm mt-3"
              :disabled="assignPatientMutation.isPending.value"
              @click="assignPatientToDoctor(patient.id)"
            >
              Прикрепить ко мне
            </button>
          </li>
          <li v-if="availablePatientsQuery.isLoading.value" class="text-base-content/70">Загрузка доступных пациентов...</li>
        </ul>
      </div>
    </section>

    <section v-if="doctorStore.statusMessage" class="alert alert-success lg:col-span-2">
      <span>{{ doctorStore.statusMessage }}</span>
    </section>
    <section v-if="errorMessage" class="alert alert-error lg:col-span-2">
      <span>{{ errorMessage }}</span>
    </section>
  </div>
</template>

