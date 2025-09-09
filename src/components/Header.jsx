"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-6 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-xl">⚡</span>
          </div>
          <h1 className="text-2xl font-bold">Pokédex DS 2025</h1>
        </div>
      </div>
    </header>
  );
}
