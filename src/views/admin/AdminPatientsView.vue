<script setup lang="ts">
import { reactive, ref } from "vue"
import { useCreatePatient } from "../../composables/admin.ts"
import { useAdminStore } from "../../store/admin.ts"
import type { PatientCreateRequest } from "../../types.ts"
import { parseApiError } from "../../utils/apiError.ts"

const adminStore = useAdminStore()
const createPatientMutation = useCreatePatient()
const errorMessage = ref("")

const patientForm = reactive<PatientCreateRequest>({
  full_name: "",
  date_of_birth: "",
  gender: "male",
  phone: "",
  email: "",
  address: "",
  insurance_number: "",
  username: "",
  password: "",
})

function resetPatientForm() {
  patientForm.full_name = ""
  patientForm.date_of_birth = ""
  patientForm.gender = "male"
  patientForm.phone = ""
  patientForm.email = ""
  patientForm.address = ""
  patientForm.insurance_number = ""
  patientForm.username = ""
  patientForm.password = ""
}

function submitPatientForm() {
  adminStore.clearStatus()
  errorMessage.value = ""

  createPatientMutation.mutate(patientForm, {
    onSuccess: (patient) => {
      adminStore.addPatient(patient)
      resetPatientForm()
    },
    onError: (error) => {
      errorMessage.value = parseApiError(error, "Не удалось добавить пациента.")
    },
  })
}
</script>

<template>
  <section class="aero-panel card rounded-2xl">
    <div class="card-body">
      <h2 class="card-title">Добавление пациента</h2>
      <form class="grid gap-3 md:grid-cols-2" @submit.prevent="submitPatientForm">
        <input v-model="patientForm.full_name" class="input input-bordered md:col-span-2" required minlength="3" placeholder="ФИО" />
        <input v-model="patientForm.date_of_birth" type="date" class="input input-bordered" required />
        <select v-model="patientForm.gender" class="select select-bordered" required>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
          <option value="other">Другой</option>
        </select>
        <input v-model="patientForm.phone" class="input input-bordered" required minlength="5" placeholder="Телефон" />
        <input v-model="patientForm.email" type="email" class="input input-bordered" required placeholder="Email" />
        <input v-model="patientForm.address" class="input input-bordered md:col-span-2" required minlength="5" placeholder="Адрес" />
        <input v-model="patientForm.insurance_number" class="input input-bordered" required minlength="3" placeholder="Номер страхового полиса" />
        <input v-model="patientForm.username" class="input input-bordered" required minlength="3" placeholder="Логин" />
        <input v-model="patientForm.password" type="password" class="input input-bordered md:col-span-2" required minlength="8" placeholder="Пароль" />
        <button type="submit" class="btn btn-primary md:col-span-2" :disabled="createPatientMutation.isPending.value">
          <span v-if="createPatientMutation.isPending.value" class="loading loading-spinner loading-xs" />
          <span>Добавить пациента</span>
        </button>
      </form>

      <div v-if="errorMessage" class="alert alert-error py-2 text-sm">
        <span>{{ errorMessage }}</span>
      </div>
      <div v-if="adminStore.statusMessage" class="alert alert-success py-2 text-sm">
        <span>{{ adminStore.statusMessage }}</span>
      </div>
    </div>
  </section>
</template>

