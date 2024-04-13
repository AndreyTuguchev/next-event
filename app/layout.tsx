import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'

const poppins = Poppins({ subsets: ["latin"], weight: ['400', '500', '600', '700' ], variable: "--font-popins" });

export const metadata: Metadata = {
  title: "Next Event App",
  description: "Next Level Event Management Platform",
  icons:{
    icon: '/assets/images/logo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
