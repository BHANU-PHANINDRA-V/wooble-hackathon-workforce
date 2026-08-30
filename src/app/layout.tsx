import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { EasyModeProvider } from "@/context/EasyModeContext";
import { AuthProvider } from "@/context/AuthContext";
import { DemoQuickLoginBar } from "@/components/shared/DemoQuickLoginBar";
import { Navbar } from "@/components/shared/Navbar";
import { MobileBottomNav } from "@/components/shared/MobileBottomNav";

export const metadata: Metadata = {
  title: "Blue Workforce Connect '26 — Verified Blue-Collar Recruitment Platform",
  description: "Digital verified identity, explainable AI job matching, and recruitment platform for India's skilled workforce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 md:pb-0">
        <LanguageProvider>
          <EasyModeProvider>
            <AuthProvider>
              <DemoQuickLoginBar />
              <Navbar />
              <main className="flex-1">{children}</main>
              <MobileBottomNav />
            </AuthProvider>
          </EasyModeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
