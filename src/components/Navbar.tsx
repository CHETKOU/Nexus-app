"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Plus, MessageSquare, User } from 'lucide-react';
import CreateMenu from './CreateMenu'; // Assure-toi que le fichier est bien dans le même dossier

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fonction pour vérifier si l'onglet est actif
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-900 flex justify-around items-center h-16 z-50 px-2">
        {/* ACCUEIL */}
        <Link href="/feed" className="flex flex-col items-center gap-1 w-full">
          <Home className={`w-7 h-7 ${isActive('/feed') ? 'text-white' : 'text-gray-500'}`} />
          <span className={`text-[10px] ${isActive('/feed') ? 'text-white font-bold' : 'text-gray-500'}`}>
            Accueil
          </span>
        </Link>

        {/* AMIS */}
        <button className="flex flex-col items-center gap-1 w-full opacity-50 cursor-not-allowed">
          <Users className="w-7 h-7 text-gray-500" />
          <span className="text-[10px] text-gray-500">Amis</span>
        </button>

        {/* --- BOUTON PLUS (+) AVEC LOGIQUE D'OUVERTURE --- */}
        <div className="flex justify-center w-full">
          <button 
            onClick={() => setIsMenuOpen(true)} 
            className="relative w-12 h-8 active:scale-90 transition-transform focus:outline-none"
          >
            {/* Les bords colorés typiques de l'icône + */}
            <div className="absolute inset-0 bg-cyan-400 rounded-lg translate-x-[-3px]"></div>
            <div className="absolute inset-0 bg-[#FE2C55] rounded-lg translate-x-[3px]"></div>
            <div className="absolute inset-0 bg-white rounded-lg flex items-center justify-center">
              <Plus className="text-black w-6 h-6 stroke-[3px]" />
            </div>
          </button>
        </div>

        {/* MESSAGES */}
        <button className="flex flex-col items-center gap-1 w-full opacity-50 cursor-not-allowed">
          <MessageSquare className="w-7 h-7 text-gray-500" />
          <span className="text-[10px] text-gray-500">Messages</span>
        </button>

        {/* PROFIL */}
        <Link href="/profile/Samuel_Dimitri" className="flex flex-col items-center gap-1 w-full">
          <User className={`w-7 h-7 ${pathname.includes('/profile') ? 'text-white' : 'text-gray-500'}`} />
          <span className={`text-[10px] ${pathname.includes('/profile') ? 'text-white font-bold' : 'text-gray-500'}`}>
            Profil
          </span>
        </Link>
      </nav>

      {/* AFFICHAGE DU MENU NEXUS CREATE AU CLIC */}
      {isMenuOpen && (
        <CreateMenu onClose={() => setIsMenuOpen(false)} />
      )}
    </>
  );
}