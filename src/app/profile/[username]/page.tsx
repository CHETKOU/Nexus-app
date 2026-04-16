"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import { 
  Grid, Lock, Share2, Edit3, MoreVertical, 
  Verified, ShieldCheck, Zap, ChevronLeft,
  Bookmark, FileEdit
} from 'lucide-react';

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('posts'); 
  const [loading, setLoading] = useState(true);

  const username = params.username as string;

  useEffect(() => {
    async function loadUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUser(user);
      setLoading(false);
    }
    loadUserData();
  }, []);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-blue-500 font-black italic animate-pulse">NEXUS...</div>;

  return (
    <div className="min-h-screen bg-black text-white font-sans pb-20">
      
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between p-4 sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-gray-900">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-900 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-1">
          <span className="font-black text-sm tracking-widest uppercase italic">{username}</span>
          <Verified className="w-3.5 h-3.5 text-blue-500" />
        </div>
        <button className="p-2 hover:bg-gray-900 rounded-full transition-colors">
          <MoreVertical className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      {/* --- INFOS PROFIL --- */}
      <div className="flex flex-col items-center pt-8 px-6">
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-gradient-to-b from-gray-800 to-black border-[3px] border-gray-900 flex items-center justify-center shadow-2xl overflow-hidden text-4xl font-black italic text-gray-200">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="absolute bottom-1 right-1 bg-blue-600 p-1.5 rounded-full border-[3px] border-black shadow-lg">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="text-center mt-5">
          <h2 className="text-xl font-bold tracking-tight">Samuel Dimitri</h2>
          <p className="text-gray-500 text-sm font-medium italic">@{username}</p>
        </div>

        {/* --- STATISTIQUES --- */}
        <div className="flex justify-center gap-10 mt-8 w-full border-y border-gray-900/50 py-6">
          <div className="text-center">
            <p className="font-black text-xl leading-none">580</p>
            <p className="text-[9px] text-gray-500 uppercase font-bold mt-2 tracking-widest">Abonnés</p>
          </div>
          <div className="text-center border-x border-gray-900 px-10">
            <p className="font-black text-xl leading-none">12</p>
            <p className="text-[9px] text-gray-500 uppercase font-bold mt-2 tracking-widest">Suivis</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-blue-500">
              <Zap className="w-4 h-4 fill-current" />
              <p className="font-black text-xl leading-none">850</p>
            </div>
            <p className="text-[9px] text-blue-400/60 uppercase font-bold mt-2 tracking-widest">Points Pro</p>
          </div>
        </div>

        {/* --- BOUTONS D'ACTION --- */}
        <div className="flex gap-3 mt-8 w-full max-w-xs">
          <button className="flex-1 bg-white text-black py-3 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all">
            Modifier
          </button>
          <button className="px-4 bg-gray-900 text-white rounded-2xl border border-gray-800 active:scale-95 transition-all">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* --- DESCRIPTION DU PROFIL (BIO) --- */}
        <div className="mt-8 text-center max-w-xs">
          <p className="text-[12px] text-gray-300 leading-relaxed font-medium">
            Expert IT & Entrepreneur. Passionné par l'automatisation et la cybersécurité. 
            Partage de savoir et d'excellence sur Nexus Elite. 🛡️💻
          </p>
        </div>
      </div>

      {/* --- ONGLETS (Navigation) --- */}
      <div className="mt-10 flex border-t border-gray-900">
        <button onClick={() => setActiveTab('posts')} className={`flex-1 flex justify-center py-4 border-b-2 transition-all ${activeTab === 'posts' ? 'border-white opacity-100' : 'border-transparent opacity-20'}`}><Grid className="w-6 h-6" /></button>
        <button onClick={() => setActiveTab('favorites')} className={`flex-1 flex justify-center py-4 border-b-2 transition-all ${activeTab === 'favorites' ? 'border-white opacity-100' : 'border-transparent opacity-20'}`}><Bookmark className="w-6 h-6" /></button>
        <button onClick={() => setActiveTab('drafts')} className={`flex-1 flex justify-center py-4 border-b-2 transition-all ${activeTab === 'drafts' ? 'border-white opacity-100' : 'border-transparent opacity-20'}`}><Lock className="w-6 h-6" /></button>
      </div>

      {/* --- GRILLE DE CONTENU --- */}
      <div className="grid grid-cols-3 gap-0.5 mt-0.5">
        {activeTab === 'drafts' ? (
          <div className="col-span-3 p-12 text-center space-y-4">
            <div className="flex justify-center"><FileEdit className="w-10 h-10 text-gray-800" /></div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Brouillons sécurisés</p>
          </div>
        ) : (
          [1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-[9/16] bg-gray-900 relative group overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-2 left-2 flex items-center gap-1">
                <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                <span className="text-[10px] font-bold text-white/90">{i * 24}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}