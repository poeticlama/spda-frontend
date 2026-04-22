<script setup lang="ts">
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import { useLogin } from "../composables/auth.ts"
import type { Role } from "../types.ts"
import { parseApiError } from "../utils/apiError.ts"

const username = ref("")
const password = ref("")
const errorMessage = ref("")
const router = useRouter()

const roleToDashboard: Record<Role, string> = {
  admin: "/admin",
  doctor: "/doctor",
  patient: "/patient",
}

const loginMutation = useLogin()
const isSubmitting = computed(() => loginMutation.isPending.value)

function handleSubmit() {
  errorMessage.value = ""

  loginMutation.mutate(
    {
      username: username.value,
      password: password.value,
    },
    {
      onSuccess: (data) => {
        void router.push(roleToDashboard[data.role])
      },
      onError: (error) => {
        errorMessage.value = parseApiError(error, "Не удалось войти. Проверьте логин и пароль.")
      },
    },
  )
}
</script>

<template>
  <div class="min-h-screen px-4 py-10">
    <div class="aero-panel mx-auto w-full max-w-md rounded-3xl p-6 md:p-8">
      <h1 class="text-3xl font-semibold text-primary">Вход в систему</h1>
      <p class="mt-2 text-sm text-base-content/70">Используйте учетные данные администратора, врача или пациента.</p>

      <form class="mt-6 flex flex-col gap-4" @submit.prevent="handleSubmit">
        <label class="form-control w-full">
          <span class="label-text">Логин</span>
          <input
            v-model="username"
            type="text"
            required
            minlength="3"
            class="input input-bordered w-full"
            placeholder="Введите логин"
          />
        </label>

        <label class="form-control w-full">
          <span class="label-text">Пароль</span>
          <input
            v-model="password"
            type="password"
            required
            minlength="8"
            class="input input-bordered w-full"
            placeholder="Введите пароль"
          />
        </label>

        <div v-if="errorMessage" class="alert alert-error py-2 text-sm">
          <span>{{ errorMessage }}</span>
        </div>

        <button type="submit" class="btn btn-primary mt-2" :disabled="isSubmitting">
          <span v-if="isSubmitting" class="loading loading-spinner loading-xs" />
          <span>{{ isSubmitting ? "Выполняется вход..." : "Войти" }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>