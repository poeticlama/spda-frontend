<script setup lang="ts">
import {useUserStore} from "./store/user.ts";

const user = useUserStore()
user.init()
</script>

<template>
  <RouterView />
</template>
