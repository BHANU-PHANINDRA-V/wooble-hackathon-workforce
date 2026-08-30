import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { EasyModeProvider } from "@/context/EasyModeContext";
import { DemoQuickLoginBar } from "@/components/shared/DemoQuickLoginBar";
import { Navbar } from "@/components/shared/Navbar";
import { MobileBottomNav } from "@/components/shared/MobileBottomNav";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  title: "Blue Workforce Connect '26 | Verified Blue-Collar Recruitment Platform",
  description: "India's full-stack verified recruitment and digital identity platform for skilled and semi-skilled workforce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-slate-50 antialiased overflow-x-hidden">
      <body className={`${inter.className} min-h-full flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden w-full max-w-full relative`}>
        <LanguageProvider>
          <EasyModeProvider>
            <AuthProvider>
              <DemoQuickLoginBar />
              <Navbar />
              <main className="flex-1 w-full max-w-full pb-20 md:pb-10 overflow-x-hidden px-2 sm:px-4">
                {children}
              </main>
              <MobileBottomNav />
            </AuthProvider>
          </EasyModeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
