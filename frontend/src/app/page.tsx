import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Portfolio from "@/components/sections/Portfolio";
import Experience from "@/components/sections/Experience";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import { Suspense } from "react";
import { getConfig } from "@/data/config";

export default async function Home() {
  const config = await getConfig();

  return (
    <main>
      <Hero config={config} />
      <About config={config} />
      {config.show_portfolio === "true" && (
        <Suspense fallback={<div className="py-28 text-center text-gray-600">Cargando...</div>}>
          <Portfolio />
        </Suspense>
      )}
      {config.show_experience === "true" && <Experience />}
      {config.show_blog === "true" && (
        <Suspense fallback={<div className="py-28 text-center text-gray-600">Cargando...</div>}>
          <Blog />
        </Suspense>
      )}
      <Contact config={config} />
    </main>
  );
}