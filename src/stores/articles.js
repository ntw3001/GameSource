import { defineStore } from 'pinia';
import router from '@/router';
import { useUserStore } from '@/stores/user';

import { DB } from '@/db';
import { collection, getDoc, doc, setDoc, serverTimestamp, updateDoc, query, orderBy, getDocs, limit, startAfter, deleteDoc } from 'firebase/firestore';

let articlesCol = collection(DB, 'articles');

export const useArticleStore = defineStore ('article', {
  state:()=>({
    homeArticles: '',
    adminArticles: '',
    adminLastVisible: '',
  }),
  getters: {},
  action: {
    async addArticle(){
      try{
        
      } catch (error){
        console.error(error)
      }
    }
  }

})
