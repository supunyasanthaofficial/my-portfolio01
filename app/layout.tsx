import type { Metadata } from "next";
import type React from "react";
import { ThemeProvider } from "@/provider/ThemeProvider";
import CustomCursor from "@/components/Cursor";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

