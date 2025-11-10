<script setup>
import LayoutComp from './layout/LayoutComp.vue'
import AccountPage from './account/AccountPage.vue'
import TransactionPage from './transactions/TransactionPage.vue'
</script>

<template>
  <layout-comp>
    <h2 class="text-2xl font-bold mb-2">Dashboard</h2>
    <account-page />
    <transaction-page />
  </layout-comp>
</template>