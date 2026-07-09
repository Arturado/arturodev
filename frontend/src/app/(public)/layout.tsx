import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RecaptchaProvider from "@/components/providers/RecaptchaProvider";
import { getConfig } from "@/data/config";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getConfig();

  return (
    <RecaptchaProvider>
      <Navbar />
      <main>{children}</main>
      <Footer config={config} />
    </RecaptchaProvider>
  );
}
