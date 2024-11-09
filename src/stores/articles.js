import { defineStore } from 'pinia';
import router from '@/router';
import { useUserStore } from '@/stores/user';

import { db } from '@/utils/firebase';
import { collection, getDoc, doc, setDoc, serverTimestamp, updateDoc, query, orderBy, getDocs, limit, startAfter, deleteDoc } from 'firebase/firestore';

let articlesCol = collection(db, 'articles');

export const useArticleStore = defineStore ('article', {
  state:()=>({
    homeArticles: '',
    adminArticles: '',
    adminLastVisible: '',
  }),
  getters: {
    getUserData() {
      const userStore = useUserStore();
      return userStore.user
    }
  },
  actions: {
    async addArticle(formData){
      try{
        const user = this.getUserData;
        const newArticle = doc(articlesCol);
        await setDoc(newArticle, {
          timestamp:serverTimestamp(),
          owner: {
            uid: user.uid,
            firstname: user.firstname,
            lastname: user.lastname,
          },
          ...formData
        });
        router.push({name: 'admin_articles', query: {reload: true}})
        return true;
      } catch (error){
        throw new Error(error)
      }
    }
  }

})
