import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import Confirmar from "./Confirmar";
import Admin from "./Admin";

export default function App() {
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    const fetchEvento = async () => {
      const ref = doc(db, "evento", "info");
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setEvento(snap.data());
      }
    };
    fetchEvento();
  }, []);

  return (
    <BrowserRouter>
      {/* Navbar */}
      <nav className="bg-purple-600 text-white p-4 flex justify-between items-center">
        <h1 className="font-bold text-xl">🎂 Aniversário</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Início
          </Link>
          <Link to="/confirmar" className="hover:underline">
            Confirmar
          </Link>
          <Link to="/admin" className="hover:underline">
            Área Admin
          </Link>
        </div>
      </nav>

      {/* Rotas */}
      <Routes>
        {/* Página inicial */}
        <Route
          path="/"
          element={
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100 text-center">
              {evento ? (
                <>
                  <h2 className="text-3xl font-bold mb-4">🎂 Você está convidado!</h2>
                  <p className="mb-2">📍 Local: {evento.local}</p>
                  <p className="mb-2">📅 Data: {evento.data}</p>

                  {/* Intervalo de horário */}
                  {evento.horaInicio && evento.horaFim ? (
                    <p className="mb-2">
                      ⏰ Das <span className="font-semibold">{evento.horaInicio}</span> até{" "}
                      <span className="font-semibold">{evento.horaFim}</span>
                    </p>
                  ) : (
                    <p className="mb-2">⏰ Horário ainda não definido</p>
                  )}

                  <p className="mb-6">{evento.descricao}</p>

                  {/* Botão Confirmar Presença */}
                  <Link
                    to="/confirmar"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg shadow-lg"
                  >
                    Confirmar Presença
                  </Link>
                </>
              ) : (
                <p className="text-gray-600">Carregando informações do evento...</p>
              )}
            </div>
          }
        />

        {/* Página de confirmação */}
        <Route path="/confirmar" element={<Confirmar />} />

        {/* Página Admin */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
