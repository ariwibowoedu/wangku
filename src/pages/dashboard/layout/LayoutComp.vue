<script setup>
import UiModal from '@/ui/UiModal.vue'
import UiButton from '@/ui/UiButton.vue'
import FeatherIcon from '@/ui/FeatherIcon.vue'

import { useAuthStore } from '@/stores/auth'
import { useModal } from '@/stores/modal'
import { ref } from 'vue'

const logoutModal = useModal()
const auth = useAuthStore()

const sidebarOpen = ref(false)
const hovering = ref(false)

const links = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: 'home',
  },
]

const openLogout = () => logoutModal.toggle()
const confirmLogout = () => {
  auth.signOut()
  logoutModal.close()
}
</script>


<template>
  <ui-modal :isOpen="logoutModal.isOpen.value" title="Confirm Logout" @close="logoutModal.close">
    <p class="text-md">Are you sure want to logout?</p>
    <div class="flex item-center gap-2 justify-end mt-4">
      <ui-button @onClick="logoutModal.toggle" variant="outline">Cancel</ui-button>
      <ui-button @onClick="confirmLogout" variant="danger">Logout</ui-button>
    </div>
  </ui-modal>
  <div class="flex h-screen">
    <aside
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
      :class="[
        'bg-gray-900/95 backdrop-blur-md text-white flex flex-col shadow-lg border-r border-gray-800 overflow-hidden transition-[width] duration-300 ease-in-out ',
        sidebarOpen || hovering ? 'w-64' : 'w-20',
      ]"
    >
      <!-- LOGO -->
      <div
        class="flex items-center gap-3 justify-between p-4 bg-gray-700 h-28 transition-all duration-500 ease-in-out"
      >
        <div class="flex items-center gap-2 ml-2">
          <img
            src="/logo_ari.webp"
            class="w-8 h-8 flex-shrink-0 transition-transform duration-500 ease-in-out"
          />
          <div
            :class="
              sidebarOpen || hovering ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
            "
            class="font-bold text-lg tracking-wide overflow-hidden transition-all duration-300"
          >
            My<span class="text-indigo-400">Admin</span>
          </div>
        </div>
      </div>
      <!-- SIDEBAR -->
      <nav class="flex-1 p-3 space-y-1">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition group"
          active-class="bg-indigo-600/20 text-indigo-400"
        >
          <feather-icon
            :icon="link.icon"
            classes="w-5 h-5 group-hover:text-indigo-400 flex-shrink-0"
          />
          <div
            class="overflow-hidden transition-all duration-300"
            :class="sidebarOpen || hovering ? 'w-40 opacity-100' : 'w-0 opacity-0'"
          >
            <span class="whitespace-nowrap group-hover:text-indigo-400">{{ link.label }}</span>
          </div>
        </router-link>
      </nav>
      <div class="p-4 border-t border-gray-800">
        <button
          @click="openLogout"
          class="flex items-center gap-3 p-2 rounded-lg hover:bg-red-800 transition group"
        >
          <feather-icon icon="log-out" class="w-5 h-5 group-hover:text-red-200 flex-shrink-0" />
          <div
            class="overflow-hidden transition-all duration-300"
            :class="sidebarOpen || hovering ? 'w-40 opacity-100' : 'w-0 opacity-0'"
          >
            <span class="whitespace-nowrap group-hover:text-red-200">Logout</span>
          </div>
        </button>
      </div>
    </aside>
    <main class="flex-1 p-6 overflow-y-auto bg-light-background dark:bg-dark-background">
      <slot />
    </main>
  </div>
</template>