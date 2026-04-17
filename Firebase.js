// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWPgkdgzZG7z2To0O4I-1YUZDU5v_wBdQ",
  authDomain: "evstore-54660.firebaseapp.com",
  projectId: "evstore-54660",
  storageBucket: "evstore-54660.firebasestorage.app",
  messagingSenderId: "549087480367",
  appId: "1:549087480367:web:e7d95dba90f0fc199b14da",
  measurementId: "G-TMHRSWXCLS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
