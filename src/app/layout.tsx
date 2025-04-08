import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import BackToTop from "./components/backToTop";


const urbanist = Urbanist({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Instituto Filhas da Terra",
  description: "Instituto Filhas da Terra - Justiça Socioambiental",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${urbanist.className} antialiased`}
      >
        <Header />
        {children}
        <BackToTop />
        <Footer />
      </body>
    </html>
  );
}
