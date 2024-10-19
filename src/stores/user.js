import { defineStore } from 'pinia'
import router from '@/router'

import { AUTH, db } from '@/utils/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore'

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

  getters: {},

  actions: {
    setUser(user){
      this.user = {...this.user, ...user},
      this.auth=true
    },

    async getUserProfile(uid){
      try{
        const userRef = await getDoc(doc(db, "users", uid));
        if(!userRef.exists()){
          throw new Error('User not found')
        }
        return userRef.data()
      } catch(error) {
        throw new Error(error)
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
        throw new Error(error.code)
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
        throw new Error(error.code)
      } finally {
        this.loading = false
      }
    }
  }
})
