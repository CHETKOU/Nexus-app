"use client";
import { Upload, Send, X, ShieldCheck, Video, Image as ImageIcon, FileText } from 'lucide-react';

export default function CreateMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/98 z-50 flex flex-col animate-in fade-in slide-in-from-bottom-10 duration-300 font-sans">
      
      {/* HEADER */}
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-500" />
          <span className="font-black text-xs tracking-widest text-white uppercase">Nexus Studio</span>
        </div>
        <button onClick={onClose} className="p-2 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors">
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-8 space-y-8">
        
        {/* SECTION IMPORTER (Vidéos, Photos) */}
        <div className="space-y-4">
          <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Multimédia</p>
          <button className="w-full flex items-center justify-between p-6 bg-white text-black rounded-[2.5rem] hover:scale-[1.02] transition-transform shadow-xl shadow-blue-500/10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-black rounded-2xl">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-black italic">IMPORTER</h3>
                <p className="text-[10px] font-bold opacity-60 uppercase">Vidéo • Photo • Son</p>
              </div>
            </div>
            <div className="flex gap-2 opacity-20">
              <Video className="w-4 h-4" />
              <ImageIcon className="w-4 h-4" />
            </div>
          </button>
        </div>

        {/* SECTION PUBLIER (Texte, Savoir, LinkedIn Style) */}
        <div className="space-y-4">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Savoir & Expertise</p>
          <button className="w-full flex items-center justify-between p-6 bg-gray-900 border border-gray-800 text-white rounded-[2.5rem] hover:border-gray-600 transition-all active:scale-95">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-2xl">
                <Send className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-black italic">PUBLIER</h3>
                <p className="text-[10px] font-bold text-gray-500 uppercase">Article • Offre • Document</p>
              </div>
            </div>
            <FileText className="w-5 h-5 text-gray-700" />
          </button>
        </div>

      </div>

      {/* FOOTER */}
      <div className="p-10 text-center">
        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest leading-loose">
          Le contenu est modéré pour garantir <br /> 
          <span className="text-blue-500">l'excellence de la communauté</span>
        </p>
      </div>
    </div>
  );
}