import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/layout/PageTransition";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}