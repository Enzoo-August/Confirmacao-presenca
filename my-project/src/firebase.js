import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 🔑 Configuração do seu Firebase (copie do painel do Firebase > Configurações do projeto > SDK Web)
const firebaseConfig = {
  apiKey: "AIzaSyAIytn3C8xBi7-B-Sy4TtJLL18cD0OuCgE",
  authDomain: "confirmacoes-evento-3a62c.firebaseapp.com",
  projectId: "confirmacoes-evento-3a62c",
  storageBucket: "confirmacoes-evento-3a62c.appspot.com",
  messagingSenderId: "197425841186",
  appId: "1:197425841186:web:97b1ade82669135bb9b67b"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


