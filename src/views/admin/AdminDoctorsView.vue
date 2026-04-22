<script setup lang="ts">
import { reactive, ref } from "vue"
import { useCreateDoctor } from "../../composables/admin.ts"
import { useAdminStore } from "../../store/admin.ts"
import type { DoctorCreateRequest } from "../../types.ts"
import { parseApiError } from "../../utils/apiError.ts"

const adminStore = useAdminStore()
const createDoctorMutation = useCreateDoctor()
const errorMessage = ref("")

const doctorForm = reactive<DoctorCreateRequest>({
  full_name: "",
  specialization: "",
  phone: "",
  email: "",
  username: "",
  password: "",
})

function resetDoctorForm() {
  doctorForm.full_name = ""
  doctorForm.specialization = ""
  doctorForm.phone = ""
  doctorForm.email = ""
  doctorForm.username = ""
  doctorForm.password = ""
}

function submitDoctorForm() {
  adminStore.clearStatus()
  errorMessage.value = ""

  createDoctorMutation.mutate(doctorForm, {
    onSuccess: (doctor) => {
      adminStore.addDoctor(doctor)
      resetDoctorForm()
    },
    onError: (error) => {
      errorMessage.value = parseApiError(error, "Не удалось добавить врача.")
    },
  })
}
</script>

<template>
  <section class="aero-panel card rounded-2xl">
    <div class="card-body">
      <h2 class="card-title">Добавление врача</h2>
      <form class="grid gap-3 md:grid-cols-2" @submit.prevent="submitDoctorForm">
        <input v-model="doctorForm.full_name" class="input input-bordered md:col-span-2" required minlength="3" placeholder="ФИО" />
        <input v-model="doctorForm.specialization" class="input input-bordered" required minlength="2" placeholder="Специализация" />
        <input v-model="doctorForm.phone" class="input input-bordered" required minlength="5" placeholder="Телефон" />
        <input v-model="doctorForm.email" type="email" class="input input-bordered" required placeholder="Email" />
        <input v-model="doctorForm.username" class="input input-bordered" required minlength="3" placeholder="Логин" />
        <input v-model="doctorForm.password" type="password" class="input input-bordered md:col-span-2" required minlength="8" placeholder="Пароль" />
        <button type="submit" class="btn btn-primary md:col-span-2" :disabled="createDoctorMutation.isPending.value">
          <span v-if="createDoctorMutation.isPending.value" class="loading loading-spinner loading-xs" />
          <span>Добавить врача</span>
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

