import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMr9N9UWaaUyQnhgqv3aaUUWmHRL2J_Gs",
  authDomain: "kenza-ede73.firebaseapp.com",
  projectId: "kenza-ede73",
  storageBucket: "kenza-ede73.firebasestorage.app",
  messagingSenderId: "640789842159",
  appId: "1:640789842159:web:74fb88ec02ad75d3bb331a",
  measurementId: "G-3ZVHCDKGQZ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;