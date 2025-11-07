<template>
  <div class="fixed top-4 right-4 flex flex-col gap-2 z-50">
    <transition-group name="toast" tag="div" class="flex flex-col gap-2">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="px-4 py-3 rounded-lg shadow-lg border-r-8 flex items-center gap-2 min-w-[220px] max-w-xs text-sm font-medium"
        :class="toastClasses(toast.type)"
      >
        <span>{{ toast.message }}</span>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useToast } from '@/stores/toast'
const { toasts } = useToast()

const toastClasses = (type) => {
  switch (type) {
    case 'success':
      return 'border-green-500 bg-green-100 text-green-700'
    case 'error':
      return 'border-red-500 bg-red-100 text-red-700'
    case 'warning':
      return 'border-yellow-500 bg-yellow-100 text-yellow-700'
    default:
      return 'border-blue-500 bg-blue-100 text-blue-700'
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}
.toast-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.toast-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}
</style>
