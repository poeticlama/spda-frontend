<script setup lang="ts">
import {ref} from "vue";
import {useMutation} from "@tanstack/vue-query";
import {login} from "../api/requests.ts";
import {useRouter} from "vue-router";

const name = ref("")
const password = ref("")
const router = useRouter()

const submitForm = useMutation({
  mutationFn: login,
  onSuccess: (data) => {
    switch (data.role) {
      case "admin":
        router.push("/admin")
        break
      case "doctor":
        router.push("/doctor")
        break
      case "patient":
        router.push("/patient")
        break
    }
  }
})
</script>

<template>
  <div class="py-20 px-20 flex flex-col gap-10 items-center justify-center bg-gradient-to-r">
    <h1 class="text-4xl text-primary font-semibold">Вход</h1>
    <form class="flex flex-col items-center" @submit.prevent="() => submitForm.mutate({ username: name, password: password })">
      <fieldset class="fieldset font-light w-100">
        <label class="label label-lg text-primary">Имя</label>
        <input type="text" required class="input input-xl mb-5 text-sm w-full" v-model="name"
               placeholder="Введите ваше имя"/>
        <label class="label label-lg text-primary">Пароль</label>
        <input type="password" required class="input input-xl text-sm w-full" v-model="password"
               placeholder="Введите пароль"/>
      </fieldset>
      <button type="submit" class="mt-10 btn btn-primary rounded-xl w-4/5">Войти</button>
    </form>
  </div>
</template>

<style scoped>

</style>