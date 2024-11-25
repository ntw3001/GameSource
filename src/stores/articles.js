import { defineStore } from 'pinia';
import router from '@/router';
import { useUserStore } from '@/stores/user';

import { db } from '@/utils/firebase';
import { collection, getDoc, doc, setDoc, serverTimestamp, updateDoc, query, orderBy, getDocs, limit, startAfter, deleteDoc } from 'firebase/firestore';

import { useToast } from 'vue-toast-notification';
const $toast = useToast();

let articlesCol = collection(db, 'articles');

export const useArticleStore = defineStore ('article', {
  state:()=>({
    homeArticles: [],
    adminArticles: '',
    adminLastVisible: '',
  }),
  getters: {
    getUserData() {
      const userStore = useUserStore();
      return userStore.user
    },
    getFeaturedSlides(state) {
      return state.homeArticles.slice(0, 3)
    }
  },
  actions: {
    async getArticles(docLimit){
      try{
        const q = query(articlesCol, orderBy('timestamp', 'desc'), limit(docLimit));
        const querySnapshot = await getDocs(q);
        const articles = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        this.homeArticles = articles;
      } catch (error){
        throw new Error(error)
      }
    },
    async updateArticle(id, formData){
      try {
        const docRef = doc(db, 'articles', id)
        await updateDoc(docRef, { ...formData});
        $toast.success('Oh my god what have you done')
        return true;
      } catch (error){
        $toast.error(error.message)
        throw new Error(error)
      }
    },
    async getArticleById(id){
      try{
        const docRef = await getDoc(doc(db, 'articles', id));
        if(!docRef.exists()){
          throw new Error('You\'re being silly, give me a real ambicule')
        }
        return docRef.data();
      } catch (error){
        router.push({name: '404'})
      }
    },
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
    },
    async adminGetArticles(docLimit){
      try{
        const q = query(articlesCol, orderBy('timestamp', 'desc'), limit(docLimit));
        const querySnapshot = await getDocs(q);

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        const articles = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

        this.adminArticles = articles;
        this.adminLastVisible = lastVisible;
      } catch (error){
        throw new Error(error)
      }
    },
    async adminGetMoreArticles(docLimit){
      try{
        if(this.adminLastVisible){
          let oldArticles = this.adminArticles;

          const q = query(articlesCol, orderBy('timestamp', 'desc'), startAfter(this.adminLastVisible), limit(docLimit));
          const querySnapshot = await getDocs(q);

          const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          const newArticles = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

          this.adminArticles = [...oldArticles, ...newArticles];
          this.adminLastVisible = lastVisible;
        }



      } catch(error) {
        throw new Error(error)
      }
    },
    async removeById(articleID){
      try {
        await deleteDoc(doc(db, 'articles', articleID));
        const newList = this.adminArticles.filter(x=>{
          return x.id !== articleID
        });
        this.adminArticles = newList;
        $toast.success('Bet it was a rubbish article anyway')
      } catch (error){
        $toast.error(error.message)
        throw new Error(error)
      }
    }
  }

})
