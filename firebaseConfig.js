// firebaseConfig.js
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AlzaSyBBcCTFtk892Y0KvaQoJtMdE33fhCFP-pU", // Chave de API da Web
  authDomain: "testeleo-593ef.firebaseapp.com",    // authDomain gerado automaticamente
  projectId: "testeleo-593ef",                     // Código do projeto
  storageBucket: "testeleo-593ef.appspot.com",     // Storage bucket padrão (geralmente igual ao código do projeto)
  messagingSenderId: "215227786514",               // Número do projeto (Firebase Cloud Messaging)
  appId: "1:215227786514:web:e8f1eabba0c4f4e615bfcb"    // App ID específico 
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
