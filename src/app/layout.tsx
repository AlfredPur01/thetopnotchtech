import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Topnotch Tech Innovations | Digital Marketing, Software & Branding",
  description:
    "Topnotch Tech Innovations empowers startups and SMEs across Africa with digital marketing, software development, and branding solutions that drive growth.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
