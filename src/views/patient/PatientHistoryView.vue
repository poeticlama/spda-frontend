<script setup lang="ts">
import { usePatientProfile } from "../../composables/patient.ts"

const patientProfileQuery = usePatientProfile()
</script>

<template>
  <section class="aero-panel card rounded-2xl">
    <div class="card-body grid gap-6 lg:grid-cols-2">
      <div>
        <h2 class="card-title">Медицинские записи</h2>
        <ul class="mt-2 space-y-2 text-sm">
          <li v-for="record in patientProfileQuery.data.value?.medical_records ?? []" :key="record.id" class="rounded-lg bg-base-200 p-3">
            <p class="font-medium">{{ record.visit_date }}</p>
            <p>{{ record.diagnosis }}</p>
            <p class="text-base-content/70">{{ record.doctor_comment }}</p>
          </li>
          <li v-if="!patientProfileQuery.isLoading.value && (patientProfileQuery.data.value?.medical_records?.length ?? 0) === 0" class="text-base-content/70">
            Медицинских записей пока нет.
          </li>
        </ul>
      </div>

      <div>
        <h2 class="card-title">Назначенные рецепты</h2>
        <ul class="mt-2 space-y-2 text-sm">
          <li
            v-for="prescription in patientProfileQuery.data.value?.prescriptions ?? []"
            :key="prescription.id"
            class="rounded-lg bg-base-200 p-3"
          >
            <p class="font-medium">{{ prescription.title }}</p>
            <p>{{ prescription.dosage }} • {{ prescription.treatment_period }}</p>
            <p class="text-base-content/70">{{ prescription.doctor_comment }}</p>
          </li>
          <li v-if="!patientProfileQuery.isLoading.value && (patientProfileQuery.data.value?.prescriptions?.length ?? 0) === 0" class="text-base-content/70">
            Рецептов пока нет.
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

