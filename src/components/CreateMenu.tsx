"use client";
import { 
  Video, FileText, Image as ImageIcon, Mic, 
  X, ChevronRight, ShieldCheck, Zap 
} from 'lucide-react';

export default function CreateMenu({ onClose }: { onClose: () => void }) {
  const publishOptions = [
    {
      id: 'video',
      title: 'Expertise Vidéo',
      desc: 'Tutoriels et démonstrations (9:16)',
      icon: <Video className="w-7 h-7" />,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      id: 'image',
      title: 'Infographie / Schéma',
      desc: 'Savoir visuel et fiches techniques',
      icon: <ImageIcon className="w-7 h-7" />,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    {
      id: 'audio',
      title: 'Note Vocale Elite',
      desc: 'Podcasts courts et conseils rapides',
      icon: <Mic className="w-7 h-7" />,
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    },
    {
      id: 'text',
      title: 'Article de Fond',
      desc: 'Analyses, textes et documents PDF',
      icon: <FileText className="w-7 h-7" />,
      color: 'text-gray-300',
      bg: 'bg-white/5'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/98 z-50 flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-300 font-sans">
      {/* HEADER SÉCURISÉ */}
      <div className="flex justify-between items-center p-6 border-b border-gray-900">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-blue-600" />
          <span className="font-black text-xs tracking-[0.2em] uppercase">Nexus Lab</span>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-900 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* GRILLE DE SÉLECTION */}
      <div className="flex-1 overflow-y-auto px-6 py-10 space-y-4">
        <div className="mb-8">
          <h2 className="text-3xl font-black italic tracking-tighter">PUBLIER UN <span className="text-blue-600 underline">SAVOIR</span></h2>
          <p className="text-gray-500 text-xs mt-2 font-medium">Sélectionnez le format le plus adapté à votre expertise.</p>
        </div>

        {publishOptions.map((opt) => (
          <button 
            key={opt.id}
            className="w-full group flex items-center justify-between p-5 bg-gray-950 border border-gray-900 rounded-[2.5rem] hover:border-blue-500/40 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-5">
              <div className={`p-4 ${opt.bg} ${opt.color} rounded-2xl group-hover:scale-110 transition-transform`}>
                {opt.icon}
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold leading-tight">{opt.title}</h3>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1 italic">{opt.desc}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-800 group-hover:text-blue-500 transition-colors" />
          </button>
        ))}
      </div>

      {/* FOOTER - SYSTÈME DE RÉCOMPENSE */}
      <div className="p-8 border-t border-gray-900 bg-gray-950/50">
        <div className="flex items-center justify-center gap-3 py-3 px-6 bg-blue-600/5 border border-blue-600/20 rounded-2xl">
          <Zap className="w-4 h-4 text-blue-500 fill-current" />
          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
            Contenu éducatif détecté = +15 Points Pro
          </p>
        </div>
      </div>
    </div>
  );
}