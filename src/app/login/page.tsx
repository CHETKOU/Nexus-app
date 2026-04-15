"use client";
import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        // Redirige l'utilisateur vers le profil après connexion
        emailRedirectTo: 'http://localhost:3000/profile',
      },
    });

    if (error) {
      setMessage("Erreur : " + error.message);
    } else {
      setMessage("Vérifie ta boîte mail ! Un lien de connexion t'a été envoyé.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-black mb-2">Nexus</h1>
          <p className="text-gray-500">Connexion ou Inscription</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-100 border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-red-500"
            required
          />
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white font-bold py-3 rounded-sm hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {loading ? "Envoi en cours..." : "Continuer"}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm font-medium text-red-600 bg-red-50 p-3 rounded">
            {message}
          </p>
        )}

        <p className="text-xs text-gray-400 text-center px-4">
          En continuant, tu acceptes les Conditions d'utilisation de Nexus.
        </p>
      </div>
    </main>
  );
}