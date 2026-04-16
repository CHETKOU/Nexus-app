"use client";
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Eye, EyeOff, ShieldCheck, Mail, Lock, ArrowLeft } from 'lucide-react';

export default function AuthPage() {
  const [mode, setMode] = useState('landing'); // 'landing', 'login', 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (mode === 'register') {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: { emailRedirectTo: `${window.location.origin}/onboarding` }
      });
      if (!error) alert("Lien envoyé ! Vérifie tes mails pour valider ton compte.");
      else alert(error.message);
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
    }
    setLoading(false);
  };

  const socialLogin = async (provider: 'google' | 'facebook') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/onboarding` }
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-sm space-y-10">
        
        {/* LOGO NEXUS */}
        <div className="text-center">
          <h1 className="text-5xl font-black tracking-tighter italic text-white">NEXUS</h1>
          <p className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Elite Network</p>
        </div>

        {/* --- VUE 1 : ACCUEIL (CHOIX) --- */}
        {mode === 'landing' && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <button 
              onClick={() => setMode('register')} 
              className="w-full bg-white text-black py-4 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all"
            >
              Créer un compte
            </button>
            <button 
              onClick={() => setMode('login')} 
              className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg border border-gray-800 hover:border-gray-600 transition-all"
            >
              Se connecter
            </button>
            
            <div className="flex items-center gap-4 pt-4">
              <div className="h-[1px] bg-gray-900 flex-grow"></div>
              <span className="text-[10px] text-gray-600 font-bold tracking-widest uppercase">Ou via</span>
              <div className="h-[1px] bg-gray-900 flex-grow"></div>
            </div>

            <div className="flex justify-center gap-6">
              <button onClick={() => socialLogin('google')} className="p-4 bg-gray-950 border border-gray-900 rounded-2xl hover:border-white transition-all">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" alt="Google" />
              </button>
              
              <button onClick={() => socialLogin('facebook')} className="p-4 bg-gray-950 border border-gray-900 rounded-2xl hover:border-white transition-all">
                <svg className="w-6 h-6 fill-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* --- VUE 2 : FORMULAIRE --- */}
        {mode !== 'landing' && (
          <form onSubmit={handleAuth} className="space-y-5 animate-in slide-in-from-bottom-4 duration-300">
            <button onClick={() => setMode('landing')} className="flex items-center gap-2 text-gray-500 hover:text-white text-xs mb-6">
              <ArrowLeft className="w-4 h-4" /> Retour
            </button>

            <h2 className="text-2xl font-bold italic">{mode === 'register' ? "Inscription" : "Connexion"}</h2>

            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-gray-500 w-5 h-5" />
                <input 
                  type="email" 
                  placeholder="Email professionnel" 
                  className="w-full bg-gray-950 border border-gray-900 p-4 pl-12 rounded-2xl outline-none focus:border-white transition-all" 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-4 text-gray-500 w-5 h-5" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Mot de passe" 
                  className="w-full bg-gray-950 border border-gray-900 p-4 pl-12 pr-12 rounded-2xl outline-none focus:border-white transition-all" 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-gray-500 hover:text-white">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button disabled={loading} className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all active:scale-95">
              {loading ? "Vérification..." : mode === 'register' ? "Valider" : "Entrer"}
            </button>
          </form>
        )}

        {/* --- TEXTE DE LA CHARTE (TOUT EN BAS) --- */}
        <div className="space-y-4 pt-6">
          <div className="bg-gray-950 border border-gray-900 p-4 rounded-2xl">
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest text-center mb-1">
              Charte de la Communauté
            </p>
            <p className="text-[10px] text-gray-500 text-center leading-relaxed">
              NEXUS est un espace strictement **professionnel et éducatif**. 
              Toute publication non conforme à notre mission de partage de savoir 
              entraînera la suspension immédiate du compte.
            </p>
          </div>
          
          <p className="text-[9px] text-gray-700 text-center uppercase tracking-tighter">
            Propriété de Nexus Elite Network • Système Sécurisé
          </p>
        </div>

      </div>
    </div>
  );
}