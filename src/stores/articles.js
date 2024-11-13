import { defineStore } from 'pinia';
import router from '@/router';
import { useUserStore } from '@/stores/user';
import { useToast } from 'vue-toast-notification';
import { db } from '@/utils/firebase';
import { collection, getDoc, doc, setDoc, serverTimestamp, updateDoc, query, orderBy, getDocs, limit, startAfter, deleteDoc } from 'firebase/firestore';

const $toast = useToast();
let articlesCol = collection(db, 'articles');

export const useArticleStore = defineStore ('article', {
  state:()=>({
    homeArticles: '',
    adminArticles: '',
    adminLastVisible: '',
  }),
  getters: {},
  actions:{
    async updateArticle(id, formData){
      try{
        const docRef = doc(db, 'articles', id);
        await updateDoc(docRef, {
          ...formData
        });
        $toast.success('Updated !!')
        return true;
      } catch (error){
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
    }
  }

})
