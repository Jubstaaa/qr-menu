import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "../providers";
import "./globals.css";
import { AuthNavbar } from "../components/AuthNavbar";
import { Footer } from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QR Menu - Modern Restaurant Menü Sistemi",
  description:
    "QR kod ile restaurant menü ve sipariş sistemi. Kolay kullanım, güzel tasarım.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <AuthNavbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
