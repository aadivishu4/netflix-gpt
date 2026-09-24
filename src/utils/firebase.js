// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "REMOVED_FIREBASE_API_KEY",
  authDomain: "REMOVED_FIREBASE_AUTH_DOMAIN",
  projectId: "REMOVED_FIREBASE_PROJECT_ID",
  storageBucket: "REMOVED_FIREBASE_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "REMOVED_FIREBASE_SENDER_ID",
  appId: "1:REMOVED_FIREBASE_SENDER_ID:web:3504f96075605d05724b30",
  measurementId: "REMOVED_FIREBASE_MEASUREMENT_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const auth = getAuth();
