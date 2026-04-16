"use client";
"use client";
import { useState } from 'react';

import { supabase } from '../../lib/supabase';
// On remplace Facebook par FacebookIcon ou on utilise une autre méthode
import { Globe, Mail, GraduationCap, Briefcase, Lightbulb, User, ChevronRight } from 'lucide-react';
export default function RegisterPage() {
  // 1. On gère l'état : quel métier l'utilisateur a choisi ?
  const [role, setRole] = useState('');

  const roles = [
    { id: 'eleve', label: 'Élève', icon: <User className="w-5 h-5" /> },
    { id: 'etudiant', label: 'Étudiant', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'entrepreneur', label: 'Entrepreneur', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'apprenant', label: 'Quête du savoir', icon: <Lightbulb className="w-5 h-5" /> },
  ];

  // 2. Fonction de connexion (Google / Facebook)
  const handleLogin = async (provider: 'google' | 'facebook') => {
    if (!role) return alert("Choisis ton statut d'abord, Boss !");
    
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/feed` },
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6 pt-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-black tracking-tighter italic">NEXUS</h1>
        <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">Elite Network</p>
      </div>

      <div className="w-full max-w-sm space-y-8">
        {/* --- LE CHOIX DU STATUT --- */}
        <div className="space-y-4">
          <p className="text-sm font-bold text-gray-400">Identifiez-vous :</p>
          <div className="grid grid-cols-1 gap-3">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                  role === r.id ? 'border-white bg-white text-black' : 'border-gray-900 bg-gray-950 text-gray-400 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  {r.icon}
                  <span className="font-bold">{r.label}</span>
                </div>
                {role === r.id && <ChevronRight className="w-5 h-5" />}
              </button>
            ))}
          </div>
        </div>

        {/* --- LES BOUTONS DE CONNEXION --- */}
        <div className={`space-y-3 pt-6 border-t border-gray-900 transition-all ${role ? 'opacity-100' : 'opacity-20 pointer-events-none'}`}>
          <p className="text-[10px] text-center text-gray-500 uppercase mb-4">Continuer avec</p>
          
          <button onClick={() => handleLogin('google')} className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-bold hover:bg-gray-200">
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" />
            Google
          </button>

          <button 
  onClick={() => handleLogin('facebook')} 
  className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white py-4 rounded-2xl font-bold hover:opacity-90"
>
  {/* SVG de Facebook directement injecté */}
  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
  Facebook
</button>

          <div className="text-center pt-4">
            <button className="text-gray-500 text-sm hover:text-white underline underline-offset-4">
              Mot de passe oublié ?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}