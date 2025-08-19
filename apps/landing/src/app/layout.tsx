import type { Metadata } from "next";
import "./globals.css";
import { Navbar, Footer } from "@qrmenu/ui";

export const metadata: Metadata = {
  title: "QRMenu - Dijital Menü Platformu",
  description: "QR menü ile restoranınızı dijitalleştirin.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <Navbar
          items={[
            { label: "Özellikler", href: "#features" },
            { label: "Fiyatlandırma", href: "#pricing" },
          ]}
          cta={{ label: "Giriş Yap", href: "/login" }}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
