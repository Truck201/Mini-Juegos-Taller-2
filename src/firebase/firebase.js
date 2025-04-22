// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZF0bvA0E0B-XkrY9M8MgfAAnc1ILcz7I",
  authDomain: "pochoclo-games.firebaseapp.com",
  projectId: "pochoclo-games",
  storageBucket: "pochoclo-games.firebasestorage.app",
  messagingSenderId: "318913319735",
  appId: "1:318913319735:web:19aaf28edf545374bf40b2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
