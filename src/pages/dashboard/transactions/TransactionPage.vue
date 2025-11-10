<script setup>
import { useTransactionStore } from '@/stores/transactions'
import { computed, onMounted } from 'vue'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'

const transactionStore = useTransactionStore()

onMounted(() => {
  transactionStore.fetchAll()
})

const incomes = computed(() => transactionStore.transactions.filter((t) => t.type === 'income'))
const expenses = computed(() => transactionStore.transactions.filter((t) => t.type === 'expense'))
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div class="flex-1">
      <h3 class="text-md font-medium">Latest Incomes</h3>
      <div class="overflow-x-auto rounded-lg shadow">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-light-surface dark:bg-dark-surface">
              <th class="p-3 text-left">Date</th>
              <th class="p-3 text-left">Amount</th>
              <th class="p-3 text-left">Category</th>
              <th class="p-3 text-left">Desc</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!incomes">
              <td colspan="4" class="p-2 text-center">History unavailable</td>
            </tr>
            <tr v-else v-for="inc in incomes" :key="inc.id" class="border-t">
              <td class="p-2 text-left">{{ formatDate(inc.date) }}</td>
              <td class="p-2 text-left">{{ formatCurrency(inc.amount) }}</td>
              <td class="p-2 text-left">{{ inc.category }}</td>
              <td class="p-2 text-left">{{ inc.desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex-1">
      <h3 class="text-md font-medium">Latest Expenses</h3>
      <div class="overflow-x-auto rounded-lg shadow">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-light-surface dark:bg-dark-surface">
              <th class="p-3 text-left">Date</th>
              <th class="p-3 text-left">Amount</th>
              <th class="p-3 text-left">Category</th>
              <th class="p-3 text-left">Desc</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!expenses">
              <td colspan="4" class="p-2 text-center">History unavailable</td>
            </tr>
            <tr v-else v-for="exp in expenses" :key="exp.id" class="border-t">
              <td class="p-2 text-left">{{ formatDate(exp.date) }}</td>
              <td class="p-2 text-left">{{ formatCurrency(exp.amount) }}</td>
              <td class="p-2 text-left">{{ exp.category }}</td>
              <td class="p-2 text-left">{{ exp.desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>