// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Add this line to import Firebase Storage
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyAqkPWsbtmiqjmY5Bft3TNzG8VbsxTA9BM",
  authDomain: "lucknow-chikankari.firebaseapp.com",
  projectId: "lucknow-chikankari",
  storageBucket: "lucknow-chikankari.appspot.com",
  messagingSenderId: "763267568953",
  appId: "1:763267568953:web:3727adaf4bbff1fb1c04e8",
  measurementId: "G-X3NWC7Z6HZ"

  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Firebase Storage and Realtime Database
export const storage = getStorage(app);
export const database = getDatabase(app);
export default app;