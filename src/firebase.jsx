// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Firestore import

const firebaseConfig = {
  apiKey: "AIzaSyCPfNDWfA5kL9BoCp30FxnqKsDATlR82mw",
  authDomain: "whitecore-provides.firebaseapp.com",
  projectId: "whitecore-provides",
  storageBucket: "whitecore-provides.firebasestorage.app",
  messagingSenderId: "893279527504",
  appId: "1:893279527504:web:9062512ec118baf2f66755",
  measurementId: "G-E43SBR5CMD"
};

const app = initializeApp(firebaseConfig);

// Firebase szolgáltatások
export const auth = getAuth(app);       // Email login/regisztráció
export const analytics = getAnalytics(app); // Analytics
export const db = getFirestore(app);    // Firestore hírekhez
export default app;
