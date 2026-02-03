// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYNrF5JnJGsHfyxEg_fmAjLfQ9OSOoHGs",
  authDomain: "netflixgpt-d029e.firebaseapp.com",
  projectId: "netflixgpt-d029e",
  storageBucket: "netflixgpt-d029e.appspot.com",
  messagingSenderId: "87606520215",
  appId: "1:87606520215:web:702f1f4fa383cb28aefcd2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();