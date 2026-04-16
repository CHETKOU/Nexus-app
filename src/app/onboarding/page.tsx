"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { GraduationCap, Briefcase, Lightbulb, User, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function OnboardingPage() {
  const [role, setRole] = useState('');
  const [isSerious, setIsSerious] = useState(false); // État pour la case à cocher
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const roles = [
    { id: 'eleve', label: 'Élève', desc: 'Je suis au collège ou au lycée', icon: <User className="w-6 h-6" /> },
    { id: 'etudiant', label: 'Étudiant', desc: 'Je poursuis mes études supérieures', icon: <GraduationCap className="w-6 h-6" /> },
    { id: 'entrepreneur', label: 'Entrepreneur', desc: 'Je développe mon business ou projet', icon: <Briefcase className="w-6 h-6" /> },
    { id: 'apprenant', label: 'En quête du savoir', desc: 'Je veux apprendre de nouvelles expertises', icon: <Lightbulb className="w-6 h-6" /> },
  ];

  const handleFinish = async () => {
    if (!role || !isSerious) return;
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase.auth.updateUser({
        data: { 
          user_role: role,
          agreed_to_terms: true 
        }
      });

      if (!error) {
        router.push('/feed');
      } else {
        alert("Erreur lors de l'enregistrement : " + error.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-8 pt-16 font-sans">
      <div className="w-full max-w-sm space-y-8">
        
        <div className="space-y-2">
          <h1 className="text-3xl font-black italic tracking-tight">PRESQUE FINI...</h1>
          <p className="text-gray-400 text-sm">Nexus a besoin de connaître votre profil pour personnaliser votre apprentissage.</p>
        </div>

        {/* --- CHOIX DU STATUT --- */}
        <div className="space-y-4">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">Choisissez votre statut :</p>
          <div className="grid grid-cols-1 gap-4">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`flex items-center gap-4 p-5 rounded-3xl border-2 transition-all text-left ${
                  role === r.id 
                    ? 'border-white bg-white text-black scale-[1.02]' 
                    : 'border-gray-900 bg-gray-950 text-gray-400 hover:border-gray-700'
                }`}
              >
                <div className={`${role === r.id ? 'text-black' : 'text-gray-500'}`}>
                  {r.icon}
                </div>
                <div className="flex-grow">
                  <p className="font-bold leading-none">{r.label}</p>
                  <p className={`text-[10px] mt-1 ${role === r.id ? 'text-gray-600' : 'text-gray-500'}`}>{r.desc}</p>
                </div>
                {role === r.id && <CheckCircle2 className="w-5 h-5" />}
              </button>
            ))}
          </div>
        </div>

        {/* --- CASE À COCHER ENGAGEMENT --- */}
        <div className="flex items-start gap-3 p-4 bg-blue-900/10 border border-blue-900/30 rounded-2xl">
          <input 
            type="checkbox" 
            id="serious-check"
            checked={isSerious}
            onChange={(e) => setIsSerious(e.target.checked)}
            className="mt-1 w-5 h-5 accent-blue-500 cursor-pointer"
          />
          <label htmlFor="serious-check" className="text-[11px] text-gray-300 leading-tight cursor-pointer">
            Je certifie que j'utiliserai Nexus à des fins **professionnelles et éducatives**. 
            Je m'engage à publier du contenu sérieux et utile pour la communauté.
          </label>
        </div>

        {/* --- BOUTON FINAL --- */}
        <button 
          onClick={handleFinish}
          disabled={!role || !isSerious || loading}
          className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
            role && isSerious
              ? 'bg-[#FE2C55] text-white shadow-lg shadow-[#FE2C55]/20 active:scale-95' 
              : 'bg-gray-900 text-gray-700 cursor-not-allowed'
          }`}
        >
          {loading ? "Chargement..." : "Commencer l'expérience"}
          {!loading && <ChevronRight className="w-5 h-5" />}
        </button>

        <p className="text-[10px] text-gray-700 text-center uppercase tracking-tighter italic">
          Nexus Elite • Votre futur commence ici
        </p>
      </div>
    </div>
  );
}