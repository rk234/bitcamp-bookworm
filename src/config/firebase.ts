// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMYIToUVhKZp78ep7gV3jAt4orEf9aiBI",
  authDomain: "bitcamp-bookworm.firebaseapp.com",
  projectId: "bitcamp-bookworm",
  storageBucket: "bitcamp-bookworm.firebasestorage.app",
  messagingSenderId: "997424889707",
  appId: "1:997424889707:web:7ebe461d98e409a8ee162e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
