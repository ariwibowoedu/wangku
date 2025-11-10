<script setup>
import UiToast from './ui/UiToast.vue'
import { IconoirProvider } from '@iconoir/vue'
</script>

<template>
  <IconoirProvider :icon-props="{ color: 'currentColor', with: '1.5em', height: '1.5em' }">
    <router-view />
    <ui-toast />
  </IconoirProvider>
</template>

<style scoped></style>
