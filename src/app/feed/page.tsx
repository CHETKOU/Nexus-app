"use client";
import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';
import { 
  Heart, MessageSquare, Bookmark, Send, 
  Plus, Music2, Search, Compass, ShieldCheck, 
  MoreHorizontal 
} from 'lucide-react';

export default function FeedPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedVideos, setLikedVideos] = useState<{ [key: string]: boolean }>({});
  const [activeTab, setActiveTab] = useState('selection');
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  // 1. Chargement des vidéos
  useEffect(() => {
    async function fetchVideos() {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) setVideos(data || []);
      setLoading(false);
    }
    fetchVideos();
  }, []);

  // 2. GESTION DU SON (CORRECTIF RADICAL)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.muted = false;
            video.play().catch(() => {
              video.muted = true;
              video.play();
            });
          } else {
            // Coupe le son et met en pause immédiatement
            video.pause();
            video.muted = true;
            video.currentTime = 0; 
          }
        });
      },
      { threshold: 0.7 } // Précision accrue
    );

    videoRefs.current.forEach((v) => v && observer.observe(v));
    return () => observer.disconnect();
  }, [videos]);

  const toggleLike = (videoId: string) => {
    setLikedVideos(prev => ({ ...prev, [videoId]: !prev[videoId] }));
  };

  if (loading) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center text-white">
      <div className="w-12 h-12 border-2 border-[#FE2C55] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="tracking-[0.3em] font-light text-sm">NEXUS PRO</p>
    </div>
  );

  return (
    <div className="h-screen bg-black snap-y snap-mandatory overflow-y-scroll no-scrollbar selection:bg-[#FE2C55]">
      
      {/* --- TOP NAVIGATION PROFESSIONNELLE --- */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-8 bg-gradient-to-b from-black/90 to-transparent">
        <Compass className="w-6 h-6 text-white/70 hover:text-white cursor-pointer transition-all" />
        
        <div className="flex items-center gap-8">
          <button 
            onClick={() => setActiveTab('reseau')}
            className={`text-[15px] font-bold tracking-tight transition-all ${activeTab === 'reseau' ? 'text-white' : 'text-white/40'}`}
          >
            Réseau
          </button>
          <button 
            onClick={() => setActiveTab('selection')}
            className={`text-[15px] font-bold tracking-tight transition-all relative ${activeTab === 'selection' ? 'text-white' : 'text-white/40'}`}
          >
            Sélection
            {activeTab === 'selection' && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
            )}
          </button>
        </div>

        <Search className="w-6 h-6 text-white/70 hover:text-white cursor-pointer transition-all" />
      </div>

      {videos.map((video, index) => (
        <div key={video.id} className="h-screen w-full snap-start relative flex items-center justify-center bg-black overflow-hidden">
          
          {/* LECTEUR VIDÉO */}
          <video
            ref={(el) => { if (el) videoRefs.current[index] = el; }}
            src={video.video_url}
            className="h-full w-full object-contain md:max-w-4xl"
            loop
            playsInline
            preload="auto"
            onClick={(e) => e.currentTarget.paused ? e.currentTarget.play() : e.currentTarget.pause()}
          />

          {/* --- INFOS CRÉATEUR (BAS GAUCHE) --- */}
          <div className="absolute bottom-24 left-6 right-20 z-10 text-white drop-shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Link href={`/profile/${video.username}`} className="font-bold text-lg hover:text-[#FE2C55] transition-colors flex items-center gap-1.5">
                @{video.username}
                <ShieldCheck className="w-4 h-4 text-blue-400 fill-blue-400/20" />
              </Link>
            </div>
            <p className="text-[14px] text-gray-200 line-clamp-2 mb-4 max-w-md font-light leading-relaxed">
              {video.caption}
            </p>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-3 py-1.5 rounded-full w-fit border border-white/10">
              <Music2 className="w-3.5 h-3.5 animate-pulse" />
              <div className="w-32 overflow-hidden whitespace-nowrap">
                <p className="animate-marquee inline-block text-[11px] uppercase tracking-widest">
                  Audio Original • Nexus Business Network —
                </p>
              </div>
            </div>
          </div>

          {/* --- BARRE D'INTERACTIONS (DROITE) --- */}
          <div className="absolute right-4 bottom-28 flex flex-col items-center gap-6 z-20">
            {/* Avatar Pro */}
            <div className="relative mb-2">
              <div className="w-14 h-14 rounded-2xl border-2 border-white/20 p-0.5 bg-gradient-to-br from-gray-700 to-black shadow-2xl overflow-hidden transform rotate-2">
                <img 
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${video.username}`} 
                  className="w-full h-full rounded-xl bg-black rotate-[-2deg] scale-110" 
                  alt="pfp" 
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white text-black rounded-md px-1 py-0.5 flex items-center justify-center shadow-lg border border-gray-200">
                <Plus className="w-3 h-3 stroke-[4px]" />
              </div>
            </div>

            {/* Like */}
            <div className="flex flex-col items-center">
              <button 
                onClick={() => toggleLike(video.id)} 
                className="p-2.5 bg-white/5 hover:bg-white/20 backdrop-blur-xl rounded-full transition-all active:scale-125"
              >
                <Heart className={`w-7 h-7 transition-colors ${likedVideos[video.id] ? 'fill-[#FE2C55] text-[#FE2C55]' : 'text-white'}`} />
              </button>
              <span className="text-[11px] font-bold mt-1.5 opacity-80">{video.likes_count + (likedVideos[video.id] ? 1 : 0)}</span>
            </div>

            {/* Comm */}
            <div className="flex flex-col items-center">
              <button className="p-2.5 bg-white/5 hover:bg-white/20 backdrop-blur-xl rounded-full transition-all">
                <MessageSquare className="w-7 h-7 text-white" />
              </button>
              <span className="text-[11px] font-bold mt-1.5 opacity-80">24</span>
            </div>

            {/* Share */}
            <div className="flex flex-col items-center">
              <button className="p-2.5 bg-white/5 hover:bg-white/20 backdrop-blur-xl rounded-full transition-all">
                <Send className="w-7 h-7 text-white" />
              </button>
              <span className="text-[11px] font-bold mt-1.5 opacity-80 uppercase tracking-tighter text-[9px]">Share</span>
            </div>

            <button className="p-2 opacity-30 hover:opacity-100 transition-opacity mt-2">
              <MoreHorizontal className="w-6 h-6 text-white" />
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}