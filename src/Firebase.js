// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxSdX8hhx0IjOgRcrxZYnyKPq2Yi3iWfA",
  authDomain: "dapok-75e63.firebaseapp.com",
  databaseURL: "https://dapok-75e63-default-rtdb.firebaseio.com",
  projectId: "dapok-75e63",
  storageBucket: "dapok-75e63.appspot.com",
  messagingSenderId: "845946346250",
  appId: "1:845946346250:web:bc3e68c40fb70b6711f8f3",
  measurementId: "G-Z3LXCD4FGX"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { db, auth}