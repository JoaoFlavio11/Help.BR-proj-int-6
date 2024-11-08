/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAFD4mJ_OVepum5t7qVbRe25xAb8ui20gE",
  authDomain: "help-br.firebaseapp.com",
  projectId: "help-br",
  storageBucket: "help-br.firebasestorage.app",
  messagingSenderId: "79552793844",
  appId: "1:79552793844:web:8fa51ea1f19c79865ba2a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//autenticar o usuário

