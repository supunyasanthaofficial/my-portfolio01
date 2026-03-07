import "./globals.css";
import CustomCursor from "@/components/Cursor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <CustomCursor />
    </html>
  );
}
