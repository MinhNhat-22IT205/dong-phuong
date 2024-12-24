import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDGoEsvmsrL5vqKktvgZ5b68Is4pDz1KcY",
  authDomain: "tourmate-e3291.firebaseapp.com",
  databaseURL: "https://tourmate-e3291-default-rtdb.firebaseio.com", // Corrected
  projectId: "tourmate-e3291",
  storageBucket: "tourmate-e3291.appspot.com", // Corrected typo
  messagingSenderId: "867126996608",
  appId: "1:867126996608:web:3ae298872a120e0d3b0065",
  measurementId: "G-J44SL8GR4G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
