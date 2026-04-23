<script setup lang="ts">
import { useUserStore } from "./store/user.ts"

const user = useUserStore()
user.init()
</script>

<template>
  <div data-theme="spda" class="min-h-screen bg-base-200/60 text-base-content antialiased">
    <RouterView />
  </div>
</template>
