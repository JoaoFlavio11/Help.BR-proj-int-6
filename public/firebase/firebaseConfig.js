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

function getErrorMessage(error){
    switch(error.code){
        case 'auth/invalid-email':
            return 'E-mail inválido';
        case 'auth/wrong-password':
            return 'Senha incorreta';
        case 'auth/missing-password':
            return 'Campo de senha vazio';
        case 'auth/missing-email':
            return 'Campo de email vazio';
        case 'auth/user-not-found':
            return 'Usuário não encontrado';
        case 'auth/user-disabled':
            return 'Usuário desabilitado';
        case 'auth/invalid-credential':
            return 'Credenciais inválidas';
        case 'auth/operation-not-allowed':
            return 'Operação não permitida';
        case 'auth/email-already-in-use':
            return 'este E-mail já está em uso';
        case 'auth/invalid-verification-code':
            return 'Código de verificação inválido';
        case 'auth/expired-action-code':
            return 'Código de verificação expirado';
        default:
            return 'Erro desconhecido';
    }
}


