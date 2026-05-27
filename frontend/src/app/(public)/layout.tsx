import Navbar from "@/components/layout/Navbar";
import RecaptchaProvider from "@/components/layout/RecaptchaProvider";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <RecaptchaProvider>
      <div className="grain" />
      <Navbar />
      {children}
    </RecaptchaProvider>
  );
}
