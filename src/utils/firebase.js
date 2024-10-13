import { initializeApp } from 'firebase/app';
import { getfirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDget2Wje5hdt7D7Dh9v93l1bxOPjNEcfQ",
  authDomain: "gamesource-2857e.firebaseapp.com",
  projectId: "gamesource-2857e",
  storageBucket: "gamesource-2857e.appspot.com",
  messagingSenderId: "205194512979",
  appId: "1:205194512979:web:4e691e084e5033b4b1d4a6",
  measurementId: "G-RPYZ2FW5G2"
};

initializeApp(firebaseConfig);

const db = getfirestore();
const AUTH = getAuth();

export { db, AUTH };
