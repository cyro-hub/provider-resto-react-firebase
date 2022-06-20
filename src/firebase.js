import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import {getFirestore} from '@firebase/firestore'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7U5MOduSqMWsbS7AZiuEMHj4Q2Hu6ID0",
  authDomain: "resto-df509.firebaseapp.com",
  projectId: "resto-df509",
  storageBucket: "resto-df509.appspot.com",
  messagingSenderId: "216910439944",
  appId: "1:216910439944:web:976840fdb48ddb82ce13bd",
  measurementId: "G-4Q59SXHFMF"
};

export const app = initializeApp(firebaseConfig);
export const storage  = getStorage(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth(app);