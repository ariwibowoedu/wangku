import { defineStore } from "pinia";
import { ref } from "vue";

export const useAccountStore = defineStore('accounts', () => {
    const accounts = ref([
        { id: 1, label: "BCA", value: '10000000' },
        { id: 2, label: 'Shopee', value: 500000 },
        { id: 3, label: 'Gopay', value: 50000 },
    ])
    const loading = ref(false)

    const addAccount = (newAccount) => {
        loading.value = true
        const id = Date.now()
        accounts.value.push({ id, ...newAccount })
        loading.value = false
    }

    const updateAccount = (id, updatedData) => {
        loading.value = true
        const index = accounts.value.findIndex(acc => acc.id === id)
        if (index !== -1) {
            accounts.value[index] = { ...accounts.value[index], ...updatedData }
        }
        loading.value = false
    }

    const deleteAccount = (id) => {
        accounts.value = accounts.value.filter(acc => acc.id !== id)
    }

    return {
        accounts,
        loading,
        addAccount,
        updateAccount,
        deleteAccount
    }
})