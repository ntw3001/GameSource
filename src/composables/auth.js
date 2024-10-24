import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { AUTH } from '@/utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export const firstLoad = () => {
  const userStore = useUserStore()
  const loading = ref(true)

  onAuthStateChanged(AUTH, async (user) => {
    if(user){
      await userStore.autoSignIn(user.uid)
      // userStore.setUser(userData)
    }
    loading.value = false
  })
  return { loading }
}
