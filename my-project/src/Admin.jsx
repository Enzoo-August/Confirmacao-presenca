import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import AdminLogin from "./AdminLogin";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [confirmados, setConfirmados] = useState([]);
  const [evento, setEvento] = useState({
    data: "",
    horaInicio: "",
    horaFim: "",
    local: "",
    descricao: "",
  });

  // 🔹 Verificar login
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (usuario) => {
      setUser(usuario);
      setLoadingAuth(false);
    });
    return () => unsub();
  }, []);

  // 🔹 Carregar confirmados em tempo real
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "confirmados"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setConfirmados(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, [user]);

  // 🔹 Buscar informações do evento
  useEffect(() => {
    if (!user) return;
    const fetchEvento = async () => {
      const eventoRef = doc(db, "evento", "info");
      const eventoSnap = await getDoc(eventoRef);
      if (eventoSnap.exists()) {
        setEvento(eventoSnap.data());
      }
    };
    fetchEvento();
  }, [user]);

  // 🔹 Salvar informações
  const salvarEvento = async () => {
    try {
      const eventoRef = doc(db, "evento", "info");
      await setDoc(eventoRef, evento);
      alert("Informações da festa salvas com sucesso 🎉");
    } catch (error) {
      alert("Erro ao salvar: " + error.message);
    }
  };

  // 🔹 Excluir um confirmado
  const excluirConfirmado = async (id) => {
    try {
      await deleteDoc(doc(db, "confirmados", id));
    } catch (error) {
      alert("Erro ao excluir: " + error.message);
    }
  };

  // 🔹 Logout
  const handleLogout = async () => {
    await signOut(auth);
  };

  // 🔹 Enquanto verifica login
  if (loadingAuth) return <p className="text-center p-6">Carregando...</p>;
  if (!user) return <AdminLogin onLogin={setUser} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">🎂 Painel do Admin</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Sair
          </button>
        </div>

        {/* Formulário do Evento */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">📌 Informações da Festa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              value={evento.data}
              onChange={(e) => setEvento({ ...evento, data: e.target.value })}
              className="p-3 border rounded"
            />

            <input
              type="time"
              value={evento.horaInicio}
              onChange={(e) => setEvento({ ...evento, horaInicio: e.target.value })}
              className="p-3 border rounded"
            />

            <input
              type="time"
              value={evento.horaFim}
              onChange={(e) => setEvento({ ...evento, horaFim: e.target.value })}
              className="p-3 border rounded"
            />

            <input
              type="text"
              placeholder="Local"
              value={evento.local}
              onChange={(e) => setEvento({ ...evento, local: e.target.value })}
              className="p-3 border rounded col-span-2"
            />

            <textarea
              placeholder="Descrição (opcional)"
              value={evento.descricao}
              onChange={(e) => setEvento({ ...evento, descricao: e.target.value })}
              className="p-3 border rounded col-span-2"
            />
          </div>

          <button
            onClick={salvarEvento}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
          >
            Salvar Informações
          </button>
        </div>

        {/* Lista de Confirmados */}
        <h2 className="text-2xl font-semibold mb-4">
          ✅ Lista de Confirmados ({confirmados.length})
        </h2>
        {confirmados.length === 0 ? (
          <p className="text-gray-600">Ninguém confirmou ainda 😢</p>
        ) : (
          <ul className="space-y-3">
            {confirmados.map((c) => (
              <li
                key={c.id}
                className="p-3 bg-purple-50 border rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <span className="font-semibold">{c.nome}</span> - {c.telefone}{" "}
                  ({c.idade} anos)
                </div>
                <button
                  onClick={() => excluirConfirmado(c.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
