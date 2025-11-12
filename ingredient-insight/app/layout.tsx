import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Example from "@/components/header";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Ingrelytics",
  description: "Analyze and Understand Ingredient Lists Effortlessly",
  icons: {
    icon: [
      { url: "/Logo.png" },
      { url: "/Logo.png", sizes: "192x192" },
      { url: "/Logo.png", sizes: "512x512" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Example />
        {children}
        <Footer />
      </body>
    </html>
  );
}
