import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "./components";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your cocktail bar",
  description: "Browse through our most popular cocktail recipes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar />
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
