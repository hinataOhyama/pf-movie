// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "pf-movie-dc66b.firebaseapp.com",
  projectId: "pf-movie-dc66b",
  storageBucket: "pf-movie-dc66b.firebasestorage.app",
  messagingSenderId: "932616626905",
  appId: "1:932616626905:web:3ca9a68fb961c1b1bd54c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);