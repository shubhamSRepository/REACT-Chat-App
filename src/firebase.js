// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeNzNDsnSXQtCw_3Y_41Y9i9ALi2eIJZc",
  authDomain: "react-chat-app-fca06.firebaseapp.com",
  projectId: "react-chat-app-fca06",
  storageBucket: "react-chat-app-fca06.appspot.com",
  messagingSenderId: "159205435914",
  appId: "1:159205435914:web:865511bb3386be8a024df3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db= getFirestore();