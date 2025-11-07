<script setup>
import UiLogo from '@/ui/UiLogo.vue'
import UiButton from '@/ui/UiButton.vue'
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-light-background dark:bg-dark-background px-4"
  >
    <div class="w-full max-w-md overflow-hidden">
      <div class="flex flex-col justify-center items-center mb-6">
        <UiLogo class="!flex-none" />
        <span class="text-3xl font-bold mb-12">Welcome!</span>
        <router-link to="/auth" class="w-48">
          <ui-button variant="secondary" size="lg" class="w-full">Login</ui-button>
        </router-link>
      </div>
    </div>
  </div>
</template>