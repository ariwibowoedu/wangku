<script setup>
import IconOir from '@/ui/IconOir.vue'
import UiModal from '@/ui/UiModal.vue'
import UiInput from '@/ui/UiInput.vue'
import UiButton from '@/ui/UiButton.vue'

import { useModal } from '@/stores/modal'
import { formatCurrency } from '@/utils/formatCurrency'
import { useAccountStore } from '@/stores/accounts'
import { ref } from 'vue'

const accountStore = useAccountStore()
const modalAcc = useModal()
const modalDelete = useModal()
const editId = ref(null)
const delId = ref(null)
const dataAcc = ref({
  label: '',
  value: 0,
})

const openAdd = () => modalAcc.toggle()
const openEdit = (acc) => {
  modalAcc.toggle()
  editId.value = acc.id
  dataAcc.value = { ...acc }
}
const openDelete = (id) => {
  modalDelete.toggle()
  delId.value = id
}

const submitAcc = () => {
  const payload = { ...dataAcc.value }
  if (editId.value) {
    accountStore.updateAccount(editId.value, payload)
  } else {
    accountStore.addAccount(payload)
  }
  clearAndClose()
}

const deleteAcc = () => {
  accountStore.deleteAccount(delId.value)
  clearAndClose()
}

const clearAndClose = () => {
  dataAcc.value = { label: '', value: 0 }
  editId.value = null
  delId.value = null
  modalAcc.close()
  modalDelete.close()
}
</script>

<template>
  <ui-modal
    :isOpen="modalAcc.isOpen.value"
    :title="editId ? 'Edit account' : 'Add Account'"
    @close="clearAndClose"
  >
    <form @submit.prevent="submitAcc" class="space-y-3">
      <ui-input type="text" v-model="dataAcc.label" label="Name Account" />
      <ui-input type="number" v-model="dataAcc.value" label="Amount" />
      <div class="flex items-center gap-2 justify-end mt-4">
        <ui-button @onClick="clearAndClose" variant="outline">Cancel</ui-button>
        <ui-button type="submit" :loading="accountStore.loading">
          {{ editId ? 'Update' : 'Save' }}
        </ui-button>
      </div>
    </form>
  </ui-modal>
  <ui-modal
    :isOpen="modalDelete.isOpen.value"
    title="Confirm delete account"
    @close="clearAndClose"
  >
    <div class="flex items-center gap-2 justify-end mt-4">
      <ui-button @onClick="clearAndClose" variant="outline">Cancel</ui-button>
      <ui-button @onClick="deleteAcc" :loading="accountStore.loading" variant="danger"
        >Delete
      </ui-button>
    </div>
  </ui-modal>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
    <div
      v-for="(acc, index) in accountStore.accounts"
      :key="index"
      class="bg-light-surface dark:bg-dark-surface rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 border-r-8 border-indigo-600"
    >
      <div class="flex items-center justify-between mb-2">
        <div class="text-md font-bold">{{ acc.label }}</div>
        <div class="flex items-center gap-2">
          <button @click="openEdit(acc)">
            <icon-oir name="EditPencil" classes="w-4 h-4" />
          </button>
          <button @click="openDelete(acc.id)">
            <icon-oir name="bin" classes="w-4 h-4" />
          </button>
        </div>
      </div>
      <div class="text-3xl font-extrabold text-indigo-600 mb-2">
        {{ formatCurrency(acc.value) }}
      </div>
    </div>
    <button
      @click="openAdd"
      class="bg-green-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col items-center text-center"
    >
      <icon-oir name="PlusCircle" classes="w-8 h-8 my-4" />
      <p class="text-sm font-semibold">Add new Account</p>
    </button>
  </div>
</template>