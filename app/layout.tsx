import type { Metadata } from "next";
import { Nunito, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AppLayout from "@/components/layout/AppLayout";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.codingbanana.com"),
  title: "CodingBanana",
  description: "Learn Coding Without Feeling Overwhelmed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#f8fafc]">
      <body
        className={`${nunito.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Script src="/js/editor.js" strategy="afterInteractive" />
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
