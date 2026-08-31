import type { Metadata } from "next";
import type React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import CustomCursor from "@/components/Cursor";
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
  title: "Supun Yasantha | Portfolio",
  description: "Full-stack Developer & Editor Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased" suppressHydrationWarning>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

