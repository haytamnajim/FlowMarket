import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import ScrollProgress from "@/components/ScrollProgress";
import ToastContainer from "@/components/ToastContainer";
import CookieBanner from "@/components/CookieBanner";
import PageTransition from "@/components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlowMarket - Workflows n8n prêts à l'emploi",
  description:
    "Marketplace de workflows n8n prêts à l'emploi. Automatisez votre business avec des templates testés et optimisés.",
  keywords: ["n8n", "automatisation", "workflow", "template", "automation"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Global UI layers */}
        <PageLoader />
        <ScrollProgress />
        <ToastContainer />
        <CookieBanner />

        <Header />
        <PageTransition>
          <div className="flex-1">{children}</div>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
