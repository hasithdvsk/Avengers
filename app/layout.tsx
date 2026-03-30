import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { CustomCursor } from "@/components/providers/custom-cursor";
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
  title: "Avengers: Cinematic Roster",
  description: "A graphic-novel inspired Avengers archive with kinetic motion and 3D visuals.",
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
      <body className="min-h-full bg-[#050505] text-white">
        <LenisProvider>
          <CustomCursor />
          <div className="relative flex min-h-full flex-col overflow-x-hidden">{children}</div>
        </LenisProvider>
      </body>
    </html>
  );
}
