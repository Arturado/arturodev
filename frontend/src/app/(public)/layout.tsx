import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RecaptchaProvider from "@/components/providers/RecaptchaProvider";
import { getConfig } from "@/data/config";

// Aplica el tema guardado antes del primer paint para evitar flash
const themeInit = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getConfig();

  return (
    <RecaptchaProvider>
      <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      <Navbar />
      <main>{children}</main>
      <Footer config={config} />
    </RecaptchaProvider>
  );
}
