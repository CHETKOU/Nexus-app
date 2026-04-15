import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // On enlève "allowedDevOrigins" qui cause l'erreur
  // Si tu as besoin d'accéder depuis l'extérieur, 
  // Next.js 15 le gère souvent nativement en mode dev.
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co', // Autorise les images venant de ton Supabase
      },
    ],
  },
};

export default nextConfig;