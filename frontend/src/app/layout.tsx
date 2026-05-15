import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import RecaptchaProvider from "@/components/layout/RecaptchaProvider";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-display",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Arturo Vasquez — Full-Stack Developer",
  description: "+7 años construyendo productos digitales. Next.js, Nest.js, WordPress, Python.",
  openGraph: {
    title: "Arturo Vasquez — Full-Stack Developer",
    description: "+7 años construyendo productos digitales.",
    url: "https://arturodev.info",
    siteName: "arturodev.info",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arturo Vasquez — Full-Stack Developer",
    description: "+7 años construyendo productos digitales.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      data-theme="dark"
      className={`${sora.variable} ${inter.variable} ${mono.variable}`}
    >
      <body>
        <RecaptchaProvider>
          <div className="grain" />
          <Navbar />
          {children}
        </RecaptchaProvider>
      </body>
    </html>
  );
}
