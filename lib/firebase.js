// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAl-UbDHp594Ip_gzbrThnT9Q1eLSoFGCo",
  authDomain: "cv-uts.firebaseapp.com",
  projectId: "cv-uts",
  storageBucket: "cv-uts.appspot.com",
  messagingSenderId: "880491703096",
  appId: "1:880491703096:web:e593a9e555db82eda06fcd",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig); // 🔥 fix error
const db = getFirestore(app);

export { db };
