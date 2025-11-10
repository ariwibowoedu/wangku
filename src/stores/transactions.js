import { defineStore } from "pinia";
import { ref } from "vue";
import { dataTransactions } from "@/assets/dataTransactions";
import { useToast } from "./toast";

export const useTransactionStore = defineStore('transactions', () => {
    const toast = useToast()
    const transactions = ref([])
    const loading = ref(false)

    const fetchAll = async () => {
        try {
            loading.value = true
            await new Promise(resolve => setTimeout(resolve, 300))
            transactions.value = dataTransactions
        } catch (err) {
            toast.error(`Error! ${err.message}`)
            console.error(err)
        } finally {
            loading.value = false
        }
    }

    const addTransaction = async (newTrans) => {
        try {
            loading.value = true
            const newItem = {
                id: Date.now(),
                created_at: newTrans.date,
                type: newTrans.type || 'expense',
                category: newTrans.category || 'other',
                amount: Number(newTrans.amount) || 0,
                desc: newTrans.desc || '-'
            }

            transactions.value.push(newItem)
        } catch (err) {
            toast.error(`Error! ${err.message}`)
            console.error(err)
        } finally {
            loading.value = false
        }
    }
    const updateTransaction = async (id, updateData) => {
        try {
            loading.value = true
            await new Promise(resolve => setTimeout(resolve), 200)
            const index = transactions.value.findIndex(t => t.id === id)
            if (index !== -1) {
                transactions.value[index] = { ...transactions.value[index], ...updateData }
            }
        } catch (err) {
            toast.error(`Error! ${err.message}`)
            console.error(err)
        } finally {
            loading.value = false
        }
    }
    const removeTransaction = async (id) => {
        try {
            loading.value = true
            await new Promise(resolve => setTimeout(resolve), 200)
            transactions.value = transactions.value.filter(t => t.id !== id)
        } catch (err) {
            toast.error(`Error! ${err.message}`)
            console.error(err)
        } finally {
            loading.value = false
        }
    }


    return {
        transactions,
        loading,
        fetchAll,
        addTransaction,
        updateTransaction,
        removeTransaction

    }
})