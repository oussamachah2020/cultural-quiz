// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";

import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmavtGhpHVwBR8K_xbaJEIrQXXmffvRa4",
  authDomain: "cultural-quiz.firebaseapp.com",
  projectId: "cultural-quiz",
  storageBucket: "cultural-quiz.appspot.com",
  messagingSenderId: "467600906383",
  appId: "1:467600906383:web:c520ab5e02a699a091b8fa",
  measurementId: "G-L35GMG96JJ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebaseApp.auth();
export const db = getFirestore(firebaseApp);
