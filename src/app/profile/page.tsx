"use client";
import React, { useState } from 'react';
import { supabase } from '../../lib/supabase'; // On importe la connexion

export default function ProfilePage() {
  const [username, setUsername] = useState("Nexus");
  const [bio, setBio] = useState("Passionné d'IT et entrepreneur");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Pour l'instant on simule, car il faudra être connecté pour avoir un ID
      alert("Connexion à Nexus-BD en cours...");
      
      // C'est ici que la magie opérera quand on aura l'Auth :
      // const { error } = await supabase.from('profiles').upsert({ 
      //   username, 
      //   bio,
      //   updated_at: new Date() 
      // });
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black flex flex-col items-center p-4">
      <h1 className="font-bold text-xl mb-8">Modifier le profil</h1>

      {/* Photo de Profil */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-2">
          <span className="text-2xl">📷</span>
        </div>
        <button className="text-sm text-red-500 font-semibold">Modifier la photo</button>
      </div>

      {/* Formulaire */}
      <div className="w-full max-w-md space-y-6">
        <div>
          <label className="text-gray-500 text-sm">Nom d'utilisateur</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="text-gray-500 text-sm">Bio</label>
          <textarea 
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black resize-none"
          />
        </div>
      </div>

      <button 
        onClick={handleSave}
        disabled={loading}
        className="mt-12 w-full max-w-md bg-red-500 text-white font-bold py-3 rounded-md disabled:opacity-50"
      >
        {loading ? "Enregistrement..." : "Enregistrer les modifications"}
      </button>
    </main>
  );
}