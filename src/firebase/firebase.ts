import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChK7qFYQ5w1INpfNF6_9wdd6TIV_m1dXM",
  authDomain: "blog-posting-app-3ea04.firebaseapp.com",
  projectId: "blog-posting-app-3ea04",
  storageBucket: "blog-posting-app-3ea04.firebasestorage.app",
  messagingSenderId: "863527453567",
  appId: "1:863527453567:web:ffe2f0727b6dddf7fb504a",
  measurementId: "G-QSJ6PX8XJ3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);