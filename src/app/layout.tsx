import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { TenderDataProvider } from "@/context/TenderDataContext";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GeM-Rakshak | AI Bid Compliance & Document Forensics Platform",
  description:
    "AI-powered integrated bid compliance, document forensics and authenticity verification workspace for Public Procurement Officers on GeM (CPCL / MoP&NG).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen font-sans bg-off-white dark:bg-dark-navy text-deep-navy dark:text-crisp-white antialiased transition-colors duration-200">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            <TenderDataProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex flex-1">
                  <Sidebar />
                  <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
                    {children}
                  </main>
                </div>
              </div>
            </TenderDataProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
