import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Magnolia Manchester United Demo",
  description: "SSR Magnolia home page rendered with Next.js and react-editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
