import React from "react";
import { Link } from "react-router-dom";
import { Home, ClipboardList, Settings, LogOut } from "lucide-react";

export default function Sidebar({ onLogout }) {
  return (
    <div className="h-screen w-64 bg-gradient-to-b from-purple-600 to-indigo-700 text-white flex flex-col shadow-lg">
      {/* Logo / Título */}
      <div className="p-6 text-center font-bold text-2xl border-b border-purple-500">
        🎂 Admin
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-purple-500 transition"
        >
          <Home size={20} /> Início
        </Link>

        <Link
          to="/confirmar"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-purple-500 transition"
        >
          <ClipboardList size={20} /> Confirmar
        </Link>

        <Link
          to="/admin"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-purple-500 transition"
        >
          <Settings size={20} /> Painel Admin
        </Link>
      </nav>

      {/* Botão Logout */}
      <div className="p-4 border-t border-purple-500">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition"
        >
          <LogOut size={20} /> Sair
        </button>
      </div>
    </div>
  );
}
