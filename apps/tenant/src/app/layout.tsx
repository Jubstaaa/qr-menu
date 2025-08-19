import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QRMenu Tenant",
  description: "Müşteri menüsü ve dashboard",
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
