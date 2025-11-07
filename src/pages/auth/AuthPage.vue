<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

import UiLogo from '@/ui/UiLogo.vue'
import UiInput from '@/ui/UiInput.vue'
import UiButton from '@/ui/UiButton.vue'

const auth = useAuthStore()
const form = reactive({
  email: '',
  password: '',
})

const error = ref([])
function validatelogin() {
  error.value = {}
  if (!form.email) error.value.email = 'Please enter email address'
  else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(form.email))
    error.value.email = 'Please enter a valid email address'

  if (!form.password) error.value.password = 'Please enter your password'
  return Object.keys(error.value).length === 0
}
async function submitLogin() {
  if (!validatelogin()) return
  console.log(form.email, form.password)
  await auth.signIn(form.email, form.password)
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4">
    <div class="w-full max-w-md bg-light-overlay rounded-2xl shadow-xl overflow-hidden">
      <div class="p-8">
        <div class="flex justify-center items-center my-4">
          <ui-logo class="!flex-none" />
        </div>
        <form @submit.prevent="submitLogin" class="space-y-4">
          <ui-input
            type="email"
            v-model="form.email"
            label="Email"
            id="email"
            :error="error.email"
          />
          <ui-input
            type="password"
            v-model="form.password"
            label="Password"
            id="password"
            :error="error.password"
          />
          <ui-button type="submit" :loading="auth.loading" class="w-full">Login</ui-button>
        </form>
      </div>
    </div>
  </div>
</template>