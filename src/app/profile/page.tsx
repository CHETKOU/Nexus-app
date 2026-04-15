"use client";
import React, { useState } from 'react';

export default function ProfilePage() {
  const [username, setUsername] = useState("Chetkou Samuel");
  const [bio, setBio] = useState("Passionné d'IT et entrepreneur");

  return (
    <main className="min-h-screen bg-white text-black flex flex-col items-center p-4">
      {/* Header */}
      <div className="w-full max-w-md flex justify-between items-center mb-8">
        <h1 className="font-bold text-xl text-center flex-1">Modifier le profil</h1>
      </div>

      {/* Section Photo de Profil */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden mb-2 relative group">
          {/* Simulation d'image */}
          <div className="w-full h-full flex items-center justify-center text-gray-400">
             📷
          </div>
          <input 
            type="file" 
            className="absolute inset-0 opacity-0 cursor-pointer" 
            accept="image/*"
          />
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

      <button className="mt-12 w-full max-w-md bg-red-500 text-white font-bold py-3 rounded-md">
        Enregistrer les modifications
      </button>
    </main>
  );
}
