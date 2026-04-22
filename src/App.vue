<script setup lang="ts">
import { useUserStore } from "./store/user.ts"

const user = useUserStore()
user.init()
</script>

<template>
  <div data-theme="spda" class="min-h-screen bg-base-200 text-base-content">
    <RouterView />
  </div>
</template>
