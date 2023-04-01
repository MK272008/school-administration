// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBbd0qE9_nDp4_eBZH8d3k40Et_di8vFg0",
    authDomain: "school-administration-eb906.firebaseapp.com",
    projectId: "school-administration-eb906",
    storageBucket: "school-administration-eb906.appspot.com",
    messagingSenderId: "584674116208",
    appId: "1:584674116208:web:45822b62b87a2a4063aab5",
    measurementId: "G-K8739X7P47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);