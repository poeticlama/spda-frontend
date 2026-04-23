<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import { useAddMedicalRecord, useAddPrescription, usePatientCard } from "../../composables/doctor.ts"
import { useDoctorStore } from "../../store/doctor.ts"
import type { MedicalRecordCreateRequest, PrescriptionCreateRequest } from "../../types.ts"
import { parseApiError } from "../../utils/apiError.ts"
import { formatDateRu, formatDateTimeRu } from "../../utils/dateFormat.ts"

const doctorStore = useDoctorStore()
const patientCardQuery = usePatientCard(computed(() => doctorStore.selectedPatientId))
const addMedicalRecordMutation = useAddMedicalRecord()
const addPrescriptionMutation = useAddPrescription()
const formErrorMessage = ref("")

const medicalRecordForm = reactive({
  visit_date: "",
  complaints: "",
  diagnosis: "",
  examination_results: "",
  doctor_comment: "",
})

const prescriptionForm = reactive({
  prescribed_at: "",
  title: "",
  dosage: "",
  treatment_period: "",
  doctor_comment: "",
})

function toIsoDateTime(value: string) {
  return new Date(value).toISOString()
}

function submitMedicalRecord() {
  if (!doctorStore.selectedPatientId) return
  formErrorMessage.value = ""

  const payload: MedicalRecordCreateRequest = {
    visit_date: toIsoDateTime(medicalRecordForm.visit_date),
    complaints: medicalRecordForm.complaints,
    diagnosis: medicalRecordForm.diagnosis,
    examination_results: medicalRecordForm.examination_results,
    doctor_comment: medicalRecordForm.doctor_comment,
  }

  addMedicalRecordMutation.mutate(
    {
      patientId: doctorStore.selectedPatientId,
      payload,
    },
    {
      onSuccess: () => {
        doctorStore.setStatusMessage("Медицинская запись успешно добавлена.")
        medicalRecordForm.visit_date = ""
        medicalRecordForm.complaints = ""
        medicalRecordForm.diagnosis = ""
        medicalRecordForm.examination_results = ""
        medicalRecordForm.doctor_comment = ""
      },
      onError: (error) => {
        formErrorMessage.value = parseApiError(error, "Не удалось добавить медицинскую запись.")
      },
    },
  )
}

function submitPrescription() {
  if (!doctorStore.selectedPatientId) return
  formErrorMessage.value = ""

  const payload: PrescriptionCreateRequest = {
    prescribed_at: toIsoDateTime(prescriptionForm.prescribed_at),
    title: prescriptionForm.title,
    dosage: prescriptionForm.dosage,
    treatment_period: prescriptionForm.treatment_period,
    doctor_comment: prescriptionForm.doctor_comment,
  }

  addPrescriptionMutation.mutate(
    {
      patientId: doctorStore.selectedPatientId,
      payload,
    },
    {
      onSuccess: () => {
        doctorStore.setStatusMessage("Рецепт успешно добавлен.")
        prescriptionForm.prescribed_at = ""
        prescriptionForm.title = ""
        prescriptionForm.dosage = ""
        prescriptionForm.treatment_period = ""
        prescriptionForm.doctor_comment = ""
      },
      onError: (error) => {
        formErrorMessage.value = parseApiError(error, "Не удалось добавить рецепт.")
      },
    },
  )
}
</script>

<template>
  <div class="grid gap-6 lg:grid-cols-3">
    <section class="aero-panel card rounded-2xl lg:col-span-1">
      <div class="card-body gap-3 p-5 text-sm md:p-6">
        <h2 class="card-title">Карта пациента</h2>
        <p v-if="!doctorStore.selectedPatientId" class="text-base-content/70">Сначала выберите пациента во вкладке "Пациенты".</p>
        <p v-else-if="patientCardQuery.isLoading.value" class="text-base-content/70">Загрузка карты пациента...</p>
        <template v-else-if="patientCardQuery.data.value">
          <p><strong>ФИО:</strong> {{ patientCardQuery.data.value.personal_data.full_name }}</p>
          <p><strong>Дата рождения:</strong> {{ formatDateRu(patientCardQuery.data.value.personal_data.date_of_birth) }}</p>
          <p><strong>Телефон:</strong> {{ patientCardQuery.data.value.personal_data.phone }}</p>
          <p><strong>Email:</strong> {{ patientCardQuery.data.value.personal_data.email }}</p>
          <p><strong>Адрес:</strong> {{ patientCardQuery.data.value.personal_data.address }}</p>
        </template>
      </div>
    </section>

    <section class="aero-panel card rounded-2xl lg:col-span-2">
      <div class="card-body grid gap-6 p-5 md:p-6 lg:grid-cols-2">
        <div>
          <h2 class="card-title">Новая медицинская запись</h2>
          <form class="mt-3 grid gap-3" @submit.prevent="submitMedicalRecord">
            <input v-model="medicalRecordForm.visit_date" type="datetime-local" class="input input-bordered" required />
            <textarea v-model="medicalRecordForm.complaints" class="textarea textarea-bordered" required minlength="2" placeholder="Жалобы" />
            <textarea v-model="medicalRecordForm.diagnosis" class="textarea textarea-bordered" required minlength="2" placeholder="Диагноз" />
            <textarea
              v-model="medicalRecordForm.examination_results"
              class="textarea textarea-bordered"
              required
              minlength="2"
              placeholder="Результаты осмотра"
            />
            <textarea v-model="medicalRecordForm.doctor_comment" class="textarea textarea-bordered" required minlength="2" placeholder="Комментарий врача" />
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="!doctorStore.selectedPatientId || addMedicalRecordMutation.isPending.value"
            >
              Добавить запись
            </button>
          </form>
        </div>

        <div>
          <h2 class="card-title">Новый рецепт</h2>
          <form class="mt-3 grid gap-3" @submit.prevent="submitPrescription">
            <input v-model="prescriptionForm.prescribed_at" type="datetime-local" class="input input-bordered" required />
            <input v-model="prescriptionForm.title" class="input input-bordered" required minlength="2" placeholder="Название" />
            <input v-model="prescriptionForm.dosage" class="input input-bordered" required minlength="2" placeholder="Дозировка" />
            <input
              v-model="prescriptionForm.treatment_period"
              class="input input-bordered"
              required
              minlength="2"
              placeholder="Период лечения"
            />
            <textarea v-model="prescriptionForm.doctor_comment" class="textarea textarea-bordered" required minlength="2" placeholder="Комментарий врача" />
            <button type="submit" class="btn btn-primary" :disabled="!doctorStore.selectedPatientId || addPrescriptionMutation.isPending.value">
              Добавить рецепт
            </button>
          </form>
        </div>
      </div>
    </section>

    <section class="aero-panel card rounded-2xl lg:col-span-3">
      <div class="card-body grid gap-6 p-5 md:p-6 lg:grid-cols-2">
        <div>
          <h2 class="card-title">История медицинских записей</h2>
          <ul class="mt-2 space-y-2 text-sm">
            <li
              v-for="record in patientCardQuery.data.value?.medical_records ?? []"
              :key="record.id"
              class="rounded-xl border border-base-300/70 bg-base-100/70 p-3"
            >
              <p class="font-medium">{{ formatDateTimeRu(record.visit_date) }}</p>
              <p>{{ record.diagnosis }}</p>
              <p class="text-base-content/70">{{ record.doctor_comment }}</p>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="card-title">История рецептов</h2>
          <ul class="mt-2 space-y-2 text-sm">
              <li
                v-for="prescription in patientCardQuery.data.value?.prescriptions ?? []"
                :key="prescription.id"
                class="rounded-xl border border-base-300/70 bg-base-100/70 p-3"
              >
              <p class="font-medium">{{ prescription.title }}</p>
              <p>{{ prescription.dosage }} • {{ prescription.treatment_period }}</p>
              <p class="text-base-content/70">{{ prescription.doctor_comment }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section v-if="doctorStore.statusMessage" class="alert alert-success lg:col-span-3">
      <span>{{ doctorStore.statusMessage }}</span>
    </section>
    <section v-if="formErrorMessage" class="alert alert-error lg:col-span-3">
      <span>{{ formErrorMessage }}</span>
    </section>
  </div>
</template>

