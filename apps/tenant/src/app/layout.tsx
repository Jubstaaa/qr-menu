import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "../providers";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WifiPopover from "../components/WifiPopover";
import { apiClient } from "@qr-menu/shared-utils";
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

async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const subdomain = headersList.get("x-subdomain");

  const { data: menu } = await apiClient.getMenuBySubdomainPublic({
    subdomain: subdomain || undefined,
  });

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

  const { data: menu } = await apiClient.getMenuBySubdomainPublic({
    subdomain: subdomain || undefined,
  });

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
              restaurantDescription={menu.restaurant_description}
              restaurantPhone={menu.restaurant_phone}
              restaurantAddress={menu.restaurant_address}
              openingTime={menu.opening_time}
              closingTime={menu.closing_time}
            />
            <WifiPopover
              wifiSsid={menu.wifi_ssid}
              wifiPassword={menu.wifi_password}
            />
          </div>
        </Providers>
      </body>
    </html>
  );
}
