"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import {Toaster} from "@/components/ui/sonner";

import { Providers } from "@/store/providers";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
   useEffect(() => {
    // Disable right click
    // const blockRightClick = (e) => e.preventDefault();
    // document.addEventListener("contextmenu", blockRightClick);

    // Disable keyboard shortcuts
    const blockShortcuts = (e) => {
      if (
        (e.ctrlKey && e.key === "s") || // Save
        (e.ctrlKey && e.key === "u") || // View Source
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") || // Dev Tools
        (e.metaKey && e.key === "s")    // macOS Save
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", blockShortcuts);

    return () => {
      // document.removeEventListener("contextmenu", blockRightClick);
      document.removeEventListener("keydown", blockShortcuts);
    };
  }, []);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <Providers>
            {children}
            <Toaster />
          </Providers>
      </body>
    </html>
  );
}
