import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

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
  metadataBase: new URL("https://arturodev.info"),
  title: {
    default: "Arturo Vasquez — Full Stack Developer",
    template: "%s | Arturo Vasquez",
  },
  description:
    "Desarrollador Full Stack con +7 años de experiencia. WordPress, WooCommerce, Magento, React, NestJS, Docker.",
  keywords: [
    "full stack developer",
    "wordpress developer",
    "react developer",
    "nestjs",
    "magento",
    "woocommerce",
    "freelance developer chile",
  ],
  authors: [{ name: "Arturo Vasquez", url: "https://arturodev.info" }],
  creator: "Arturo Vasquez",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://arturodev.info",
    siteName: "Arturo Vasquez — Full Stack Developer",
    title: "Arturo Vasquez — Full Stack Developer",
    description:
      "Desarrollador Full Stack con +7 años de experiencia. WordPress, WooCommerce, Magento, React, NestJS, Docker.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arturo Vasquez — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arturo Vasquez — Full Stack Developer",
    description: "Desarrollador Full Stack con +7 años de experiencia.",
    images: ["/og-image.png"],
    creator: "@arturado",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${sora.variable} ${inter.variable} ${mono.variable}`}
    >
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
