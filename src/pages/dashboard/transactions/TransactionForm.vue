<script setup>
import LayoutComp from '../layout/LayoutComp.vue'
import IconOir from '@/ui/IconOir.vue'
import UiInput from '@/ui/UiInput.vue'

import { useTransactionStore } from '@/stores/transactions'
import { ref } from 'vue'

const newTrans = ref({
  type: 'expense',
  date: Date.now().toLocaleString(),
  category: 'other',
  amount: 0,
  desc: '',
})
</script>

<template>
  <layout-comp>
    <div class="flex items-center gap-4 md:gap-6 mb-8">
      <router-link to="/dashboard">
        <icon-oir name="ArrowUpLeft" classes="h-8 w-8" />
      </router-link>
      <h2 class="text-2xl font-bold">New Transaction</h2>
    </div>
  </layout-comp>
</template>