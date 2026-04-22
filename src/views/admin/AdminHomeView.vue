<script setup lang="ts">
import { useRouter } from "vue-router"
import { useUserStore } from "../../store/user.ts"

const router = useRouter()
const userStore = useUserStore()

function logout() {
  userStore.logout()
  void router.push("/login")
}
</script>

<template>
  <div class="min-h-screen">
    <header class="navbar border-b border-base-300/70 bg-base-100/75 px-4 backdrop-blur md:px-8">
      <div class="flex-1">
        <h1 class="text-xl font-semibold">Панель администратора</h1>
      </div>
      <button class="btn btn-outline btn-sm" @click="logout">Выйти</button>
    </header>

    <main class="mx-auto w-full max-w-7xl px-4 py-6 lg:px-8">
      <div role="tablist" class="aero-tabs tabs tabs-boxed mb-6 inline-flex p-1">
        <RouterLink to="/admin/doctors" class="tab" active-class="tab-active">Добавление врача</RouterLink>
        <RouterLink to="/admin/patients" class="tab" active-class="tab-active">Добавление пациента</RouterLink>
        <RouterLink to="/admin/activity" class="tab" active-class="tab-active">Активность</RouterLink>
      </div>

      <RouterView />
    </main>
  </div>
</template>

<style scoped>

</style>