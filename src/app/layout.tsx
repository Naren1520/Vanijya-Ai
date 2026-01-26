import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import LoadingWrapper from "@/components/LoadingWrapper";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Vanijya AI - Multilingual Mandi Platform",
  description: "Empowering India's local vendors with AI-powered multilingual communication, fair price discovery, and smart negotiation tools.",
  keywords: "mandi, multilingual, AI, price discovery, vendors, India, agriculture, vanijya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        <LanguageProvider>
          <LoadingWrapper>
            <Navbar />
            <main className="min-h-screen pt-16">
              {children}
            </main>
            <Footer />
          </LoadingWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
