// src/types/index.ts

export interface Profile {
  id: string;          // ID unique de l'utilisateur (fourni par Supabase)
  email: string;       // Utile pour l'OTP
  username: string;    // Ton @ pseudo
  full_name?: string;  // Nom complet
  avatar_url?: string; // URL de ta photo de profil
  bio?: string;        // Ta description
}

export interface Video {
  id: string;
  created_at: string;
  user_id: string;     // Lien vers le créateur
  video_url: string;   // Lien du fichier vidéo
  caption: string;     // Texte sous la vidéo
  likes_count: number;
  author?: Profile;    // Infos du profil pour l'affichage
}

export interface Follower {
  id: string;
  follower_id: string; // Celui qui s'abonne
  following_id: string; // Celui qui est suivi
}