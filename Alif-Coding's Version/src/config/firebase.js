// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { CiApple } from "react-icons/ci";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTc1O_D7txtl8wGgZ858rNb6acZdtfUaE",
  authDomain: "selfpedia-50288.firebaseapp.com",
  projectId: "selfpedia-50288",
  storageBucket: "selfpedia-50288.appspot.com",
  messagingSenderId: "619207537600",
  appId: "1:619207537600:web:bad7efc006dc9c7a520e25",
  measurementId: "G-D47T1ZENB9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const Storage = getStorage(app);
