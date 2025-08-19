import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
