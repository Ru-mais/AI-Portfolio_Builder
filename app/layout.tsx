import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Legacy | Build Your Online Presence",
  description: "A secure and scalable SaaS platform to build and publish your professional portfolio in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Syne:wght@400;700;800&family=Bebas+Neue&family=Space+Mono:wght@400;700&family=Press+Start+2P&family=Fraunces:opsz,wght@9..144,400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">
          {children}
      </body>
    </html>
  );
}
