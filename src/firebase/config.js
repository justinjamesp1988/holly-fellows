import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC85ASD6tBu9WSoQfKumSAafsfqdYO1n4A",
  authDomain: "holly-fellows-trip-mates.firebaseapp.com",
  projectId: "holly-fellows-trip-mates",
  storageBucket: "holly-fellows-trip-mates.firebasestorage.app",
  messagingSenderId: "1036595683627",
  appId: "1:1036595683627:web:4932eb1d8330c59f40256e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);