"use client"; // Obligatoire pour utiliser usePathname

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar"; 
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Note : On retire "export const metadata" car on utilise "use client" ici.
// Si tu as besoin de metadata, on les mettra dans un fichier séparé plus tard.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Liste des pages "Sérieuses" où la barre TikTok doit être CACHÉE
  // On cache sur login, register et le futur onboarding
  const noNavPages = ["/login", "/register", "/onboarding"];
  const shouldHideNavbar = noNavPages.includes(pathname);

  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-black min-h-full flex flex-col">
        {/* Contenu principal de l'application */}
        <main className={`flex-1 ${shouldHideNavbar ? "" : "pb-16"}`}> 
          {/* On n'ajoute le padding que si la Navbar est visible */}
          {children}
        </main>

        {/* On affiche la Navbar uniquement si on n'est pas sur une page d'auth */}
        {!shouldHideNavbar && <Navbar />}
      </body>
    </html>
  );
}