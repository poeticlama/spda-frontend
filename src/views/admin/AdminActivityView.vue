<script setup lang="ts">
import { useAdminStore } from "../../store/admin.ts"

const adminStore = useAdminStore()
</script>

<template>
  <section class="aero-panel card rounded-2xl">
    <div class="card-body grid gap-4 md:grid-cols-2">
      <div>
        <h2 class="card-title">Добавленные врачи</h2>
        <ul class="mt-2 space-y-2 text-sm">
          <li v-for="doctor in adminStore.createdDoctors" :key="doctor.id" class="rounded-lg bg-base-200 p-3">
            <p class="font-medium">{{ doctor.full_name }}</p>
            <p class="text-base-content/70">{{ doctor.specialization }} • {{ doctor.phone }}</p>
            <p class="text-base-content/70">{{ doctor.email }}</p>
          </li>
          <li v-if="adminStore.createdDoctors.length === 0" class="text-base-content/70">В этой сессии врачи еще не добавлялись.</li>
        </ul>
      </div>

      <div>
        <h2 class="card-title">Добавленные пациенты</h2>
        <ul class="mt-2 space-y-2 text-sm">
          <li v-for="patient in adminStore.createdPatients" :key="patient.id" class="rounded-lg bg-base-200 p-3">
            <p class="font-medium">{{ patient.full_name }}</p>
            <p class="text-base-content/70">{{ patient.insurance_number }} • {{ patient.phone }}</p>
            <p class="text-base-content/70">{{ patient.email }}</p>
          </li>
          <li v-if="adminStore.createdPatients.length === 0" class="text-base-content/70">В этой сессии пациенты еще не добавлялись.</li>
        </ul>
      </div>
    </div>
  </section>
</template>

