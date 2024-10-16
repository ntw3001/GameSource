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
    async register(formData){

    }
  }
})
