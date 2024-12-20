import { defineStore } from 'pinia'
import router from '@/router'

import { AUTH, db } from '@/utils/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore'
import errorCodes from '@/utils/fbcodes'

import { useToast } from 'vue-toast-notification'
const $toast = useToast()

const default_user = {
  uid: null,
  email: null,
  firstname: null,
  lastname: null,
  isAdmin: null
}

export const useUserStore = defineStore('user',{
  state: () => ({
    user: default_user,
    loading: false,
    auth: false
  }),

  getters: {
    getUserData(state) {
      return state.user
    },
    getUserId(state) {
      return state.user.uid
    }
  },

  actions: {

    setUser(user){
      this.user = {...this.user, ...user},
      this.auth = true
    },

    async updateProfile(formData){
      console.log("doing it")
      try{
        const userRef = doc(db, 'users', this.getUserId)
        await updateDoc(userRef, { ...formData })
        this.setUser(formData)
        $toast.success('Nice name, better than old name')
        return true
      } catch(error){
        $toast.error(error.message)
      } finally {
        this.loading = false
      }
    },

    async signOut(){
      await signOut (AUTH);
      this.user = default_user;
      this.auth = false;
      router.push({name: 'home'})
    },

    async autoSignIn(uid){
      try{
        const userData = await this.getUserProfile(uid)
        this.setUser(userData)
        return true
      } catch(error){
        console.log(error)
      }
    },

    async getUserProfile(uid){
      try{
        const userRef = await getDoc(doc(db, "users", uid));
        if(!userRef.exists()){
          throw new Error('User not found')
        }
        return userRef.data()
      } catch(error) {
        throw new Error(errorCodes(error.code))
      }
    },

    async signIn(formData){
      try{
        this.loading = true;
        const response = await signInWithEmailAndPassword(
          AUTH,
          formData.email,
          formData.password
        );
        const userData = await this.getUserProfile(response.user.uid)
        this.setUser(userData);
        router.push({name: 'dashboard'})
      } catch(error){
        throw new Error(errorCodes(error.code))
      } finally {
        this.loading = false
      }
    },

    async register(formData){
      try{
        this.loading = true;
        const response = await createUserWithEmailAndPassword(
          AUTH,
          formData.email,
          formData.password
        );
        const newUser = {
          uid: response.user.uid,
          email: response.user.email,
          isAdmin: false
        }
        await setDoc (doc(db, 'users', response.user.uid), newUser)
        this.setUser(newUser)
        router.push({name: 'dashboard'})
      } catch(error){
        throw new Error(errorCodes(error.code))
      } finally {
        this.loading = false
      }
    }
  }
})
