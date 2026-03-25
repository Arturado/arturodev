import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/layout/PageTransition";
import { getConfig } from "@/data/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arturo — Full Stack Developer",
  description: "+7 años construyendo productos digitales. Next.js, Nest.js, WordPress, Python.",
  openGraph: {
    title: "Arturo — Full Stack Developer",
    description: "+7 años construyendo productos digitales.",
    url: "https://arturodev.info",
    siteName: "arturodev.info",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arturo — Full Stack Developer",
    description: "+7 años construyendo productos digitales.",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getConfig();
  const primaryColor = config.primary_color || "#7c3aed";

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ "--primary-color": primaryColor } as React.CSSProperties}
      >
        <Navbar />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}