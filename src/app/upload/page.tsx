"use client";
import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleUpload = async () => {
    if (!file) return alert("Choisis une vidéo !");
    setUploading(true);

    try {
      // 1. Envoyer la vidéo dans le Storage
      const fileName = `${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Récupérer l'URL publique de la vidéo
      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);

      // 3. Enregistrer les infos dans la table 'videos'
      const { error: dbError } = await supabase.from('videos').insert({
        video_url: publicUrl,
        caption: caption,
        username: "David_Nexus" // On pourra dynamiser ça plus tard
      });

      if (dbError) throw dbError;

      alert("Vidéo publiée avec succès !");
      router.push('/feed'); // Retour au flux
    } catch (error: any) {
      alert("Erreur : " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8 text-black">Publier une vidéo</h1>
      
      <div className="w-full max-w-md space-y-4">
        <input 
          type="file" 
          accept="video/*" 
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
        />
        
        <textarea 
          placeholder="Ajoute une légende..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full border p-2 rounded-md h-24 text-black focus:outline-red-500"
        />

        <button 
          onClick={handleUpload}
          disabled={uploading}
          className="w-full bg-red-500 text-white py-3 rounded-md font-bold disabled:bg-gray-400"
        >
          {uploading ? "Publication en cours..." : "Publier maintenant"}
        </button>
      </div>
    </main>
  );
}