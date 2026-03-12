import { ThemeProvider } from "@/provider/ThemeProvider";
import "./globals.css";
import CustomCursor from "@/components/Cursor";

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
