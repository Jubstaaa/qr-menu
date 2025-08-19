import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@qrmenu/ui";

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
      <body>
        <Navbar
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Menü", href: "/menu" },
          ]}
        />
        {children}
      </body>
    </html>
  );
}
