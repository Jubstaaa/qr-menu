import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "../providers";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WifiPopover from "../components/WifiPopover";
import { publicMenuApi } from "@qr-menu/shared-utils";
import "./globals.css";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const subdomain = headersList.get("x-subdomain");

  const menu = await publicMenuApi.getMenuBySubdomain(subdomain || "");

  return {
    title: `${menu.restaurant_name} - Dijital Menü`,
    description: `${menu.restaurant_name} dijital menüsü. Lezzetli yemeklerimizi keşfedin.`,
    openGraph: {
      title: `${menu.restaurant_name} - Dijital Menü`,
      description: `${menu.restaurant_name} dijital menüsü. Lezzetli yemeklerimizi keşfedin.`,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const subdomain = headersList.get("x-subdomain");

  const menu = await publicMenuApi.getMenuBySubdomain(subdomain || "");

  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
            <Header menu={menu} />
            <main className="flex-1">{children}</main>
            <Footer
              restaurantName={menu.restaurant_name}
              restaurantDescription={menu.restaurant_description || undefined}
              restaurantPhone={menu.restaurant_phone || undefined}
              restaurantAddress={menu.restaurant_address || undefined}
              openingTime={undefined}
              closingTime={undefined}
            />
            <WifiPopover wifiSsid={undefined} wifiPassword={undefined} />
          </div>
        </Providers>
      </body>
    </html>
  );
}
