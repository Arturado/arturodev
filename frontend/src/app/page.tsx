import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Portfolio from "@/components/sections/Portfolio";
import Experience from "@/components/sections/Experience";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Suspense fallback={<div className="py-28 text-center text-gray-600">Cargando proyectos...</div>}>
        <Portfolio />
      </Suspense>
      <Suspense fallback={<div className="py-28 text-center text-gray-600">Cargando posts...</div>}>
        <Blog />
      </Suspense>
      <Contact />
    </main>
  );
}