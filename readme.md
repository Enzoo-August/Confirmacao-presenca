🎂 Aniversário - Confirmação de Presença

https://confirmacao-presenca-inky.vercel.app/








Um site moderno para confirmação de presença em festas e eventos.

🎉 Convidados confirmam presença com nome, telefone, idade e quantidade de pessoas.

🔑 Admin acessa um painel seguro para editar informações do evento, horários, descrição e foto.

🔥 Feito com React + Vite + TailwindCSS + Firebase.

✨ Funcionalidades
👤 Convidados

Visualizam: local, data, descrição, foto e intervalo de horários (das X até Y).

Formulário para confirmar a presença de 1 ou várias pessoas de uma vez.

Campos: Nome, Telefone, Idade, Quantidade de pessoas.

🔑 Admin

Login seguro com Firebase Authentication.

Edita informações do evento em tempo real:

📍 Local

📅 Data

⏰ Intervalo de horários

📝 Descrição

🖼️ Foto do evento

Gerencia lista de confirmados:

✅ Vê todas as confirmações em tempo real.

❌ Pode excluir confirmados.

🛠️ Tecnologias

⚡ React + Vite – frontend rápido e moderno.

🎨 TailwindCSS – estilização responsiva e elegante.

🔥 Firebase – backend serverless:

Firestore → confirmações e dados do evento.

Authentication → login do admin.

Storage → foto do evento.

Hosting → deploy grátis.

🚀 Instalação

Clone o projeto e instale as dependências:

git clone https://github.com/seu-usuario/aniversario-presenca.git
cd aniversario-presenca
npm install


Crie o arquivo src/firebase.js com suas credenciais do Firebase:

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_PROJECT_ID.appspot.com",
  messagingSenderId: "XXXXXXX",
  appId: "APP_ID",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


Rode o projeto localmente:

npm run dev


Acesse: http://localhost:5173

🌍 Deploy

Você pode lançar o site 100% grátis em:

Vercel
 (mais simples, ótimo para React/Vite).

Netlify
 (upload da pasta dist).

Firebase Hosting
 (integra direto com Firestore).

📷 Preview
Página Inicial

Confirmação de Presença

Área Admin

👨‍💻 Autor

Feito com ❤️ por Enzo Augusto 🚀
