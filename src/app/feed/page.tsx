"use client";
import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function FeedPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await supabase.from('videos').select('*');
      if (data) setVideos(data);
    };
    fetchVideos();
  }, []);

  // GESTION DE L'AUTO-PLAY AU SCROLL
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Si le navigateur bloque le son, on joue en muet
              video.muted = true;
              video.play();
            });
          } else {
            video.pause();
            video.currentTime = 0; // Remet à zéro quand on quitte la vidéo
          }
        });
      },
      { threshold: 0.6 } // La vidéo doit être visible à 60% pour démarrer
    );

    videoRefs.current.forEach((v) => v && observer.observe(v));
    return () => observer.disconnect();
  }, [videos]);

  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black scrollbar-hide">
      {videos.map((video, index) => (
        <div key={video.id} className="h-screen w-full snap-start relative flex items-center justify-center bg-black">
          
          <video 
            ref={(el) => (videoRefs.current[index] = el!)}
            src={video.video_url} 
            className="h-full w-full object-cover"
            loop
            playsInline
            onClick={(e) => {
              // Un clic manuel permet de "débloquer" le son pour tout le reste de la session
              e.currentTarget.muted = !e.currentTarget.muted;
            }}
          />

          {/* --- TEXTE EN BAS --- */}
          <div className="absolute bottom-24 left-4 right-20 z-10 drop-shadow-lg text-white pointer-events-none">
            <h3 className="font-extrabold text-base mb-1 pointer-events-auto">@{video.username || "nexus_user"}</h3>
            <p className="text-sm leading-tight font-light line-clamp-3">{video.caption}</p>
          </div>

          {/* --- BOUTONS LATERAUX (ICÔNES RÉELLES) --- */}
          <div className="absolute right-3 bottom-32 flex flex-col items-center space-y-6 z-20">
            
            {/* Profil */}
            <div className="relative mb-2">
              <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-gray-800">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.username}`} alt="avatar" />
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#FE2C55] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs border-2 border-black">
                +
              </div>
            </div>

            {/* Like (SVG) */}
            <div className="flex flex-col items-center cursor-pointer">
              <svg viewBox="0 0 24 24" fill="white" className="w-9 h-9 drop-shadow-md active:scale-125 transition-transform"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <span className="text-[11px] text-white font-bold mt-1">24k</span>
            </div>

            {/* Comment (SVG) */}
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 24 24" fill="white" className="w-9 h-9 drop-shadow-md active:scale-125 transition-transform"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"/></svg>
              <span className="text-[11px] text-white font-bold mt-1">156</span>
            </div>

            {/* Favorite (SVG) */}
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 24 24" fill="#FACD3B" className="w-9 h-9 drop-shadow-md active:scale-125 transition-transform"><path d="M17 3H7a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2z"/></svg>
              <span className="text-[11px] text-white font-bold mt-1">4.2k</span>
            </div>

            {/* Share (SVG) */}
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 24 24" fill="white" className="w-9 h-9 drop-shadow-md active:scale-125 transition-transform"><path d="M11.733 8.267L11.414 8H3v11h11v-5.414l.267-.319 4.319-4.319-4.853-4.681zM13 14v4h-9V10h9v4zm1.5-6.5l3.5 3.5-3.5 3.5V7.5z"/></svg>
              <span className="text-[11px] text-white font-bold mt-1 text-center leading-none">Partager</span>
            </div>

          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        </div>
      ))}
    </main>
  );
}