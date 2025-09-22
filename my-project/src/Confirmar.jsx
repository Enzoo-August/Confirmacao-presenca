import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, getDoc, collection, addDoc, Timestamp } from "firebase/firestore";

export default function Confirmar() {
  const [evento, setEvento] = useState(null);
  const [quantidade, setQuantidade] = useState(""); // agora pode ser vazio
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Buscar informações do evento
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

  // Atualiza a quantidade de pessoas e os campos
  const handleQuantidadeChange = (e) => {
    const valor = e.target.value;

    // Se o campo estiver vazio, deixa vazio
    if (valor === "") {
      setQuantidade("");
      setPessoas([]);
      return;
    }

    const qtd = parseInt(valor, 10);

    if (!isNaN(qtd) && qtd > 0) {
      setQuantidade(qtd);
      setPessoas(
        Array(qtd)
          .fill()
          .map((_, i) => pessoas[i] || { nome: "", telefone: "", idade: "" })
      );
    }
  };

  // Atualiza os dados de cada pessoa
  const handleChange = (index, field, value) => {
    const novaLista = [...pessoas];
    novaLista[index][field] = value;
    setPessoas(novaLista);
  };

  // Salvar no Firestore
  const handleConfirmar = async (e) => {
    e.preventDefault();

    // Garantir que tenha quantidade válida
    if (!quantidade || quantidade <= 0) {
      setMsg("❌ Informe a quantidade de pessoas.");
      return;
    }

    setLoading(true);
    try {
      for (let p of pessoas) {
        await addDoc(collection(db, "confirmados"), {
          nome: p.nome,
          telefone: p.telefone,
          idade: p.idade,
          qtdPessoas: quantidade,
          createdAt: Timestamp.now(),
        });
      }
      setMsg("✅ Presença(s) confirmada(s) com sucesso!");
      setPessoas([]);
      setQuantidade(""); // limpa o campo após confirmar
    } catch (err) {
      setMsg("❌ Erro ao confirmar: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-white to-blue-100 p-6">
      {/* Informações do Evento */}
      {evento ? (
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">🎂 Você está convidado!</h1>
          <p className="text-lg">📍 Local: {evento.local}</p>
          <p className="text-lg">📅 Data: {evento.data}</p>

          {/* Intervalo de horário */}
          {evento.horaInicio && evento.horaFim ? (
            <p className="text-lg">
              ⏰ Das <span className="font-semibold">{evento.horaInicio}</span> até{" "}
              <span className="font-semibold">{evento.horaFim}</span>
            </p>
          ) : (
            <p className="text-lg">⏰ Horário ainda não definido</p>
          )}

          <p className="text-lg mt-2">{evento.descricao}</p>
        </div>
      ) : (
        <p>Carregando informações do evento...</p>
      )}

      {/* Formulário */}
      <form
        onSubmit={handleConfirmar}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Confirme sua presença</h2>

        {/* Quantidade */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Quantas pessoas irão?</label>
          <input
            type="number"
            value={quantidade}
            onChange={handleQuantidadeChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Campos para cada pessoa */}
        {pessoas.map((p, index) => (
          <div key={index} className="mb-4 border rounded p-3 bg-gray-50">
            <h3 className="font-semibold mb-2">Pessoa {index + 1}</h3>
            <input
              type="text"
              placeholder="Nome"
              className="w-full mb-2 p-2 border rounded"
              value={p.nome}
              onChange={(e) => handleChange(index, "nome", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Telefone"
              className="w-full mb-2 p-2 border rounded"
              value={p.telefone}
              onChange={(e) => handleChange(index, "telefone", e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Idade"
              className="w-full mb-2 p-2 border rounded"
              value={p.idade}
              onChange={(e) => handleChange(index, "idade", e.target.value)}
              required
            />
          </div>
        ))}

        {/* Botão */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
        >
          {loading ? "Confirmando..." : "Confirmar Presença"}
        </button>
      </form>

      {/* Mensagem */}
      {msg && <p className="mt-4 text-center">{msg}</p>}
    </div>
  );
}
