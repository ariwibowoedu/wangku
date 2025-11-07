import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "./toast";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('auth', () => {
    const loading = ref(false)
    // const user = ref([])
    const isLoggedIn = ref(false)
    const toast = useToast()
    const router = useRouter()

    async function signIn(email, password) {
        const credential = {
            email: "test@test.com",
            password: "123123"
        }
        try {
            loading.value = true
            if (email === credential.email && password === credential.password) {
                isLoggedIn.value = true
            } else {
                toast.error('Email or password incorrect.')
                return
            }
            router.push('/dashboard')
            toast.success('Success login')
        } catch (err) {
            console.error(err)
            toast.error(`Error! ${err.message}`)
        } finally {
            loading.value = false
        }
    }


    return {
        loading,
        isLoggedIn,
        signIn
    }
})