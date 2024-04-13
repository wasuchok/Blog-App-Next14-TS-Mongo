"use client"

import type { Metadata } from "next";


import Header from "../components/nav/Header";
import { Toaster } from 'react-hot-toast'

import { SessionProvider } from "next-auth/react";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
      <body className="bg-[#6D5D6E]">
        <Header />
        <Toaster />
        {children}
      </body>
      </SessionProvider>
    </html>
  );
}
