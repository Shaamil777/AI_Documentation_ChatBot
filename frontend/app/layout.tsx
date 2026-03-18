import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import { ChatProvider } from "../context/ChatContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DocChat AI - AI-Powered Document Chat",
  description:
    "Upload your documents and chat with AI to get instant answers from your documentation. Supports PDF, Markdown, and Text files.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ChatProvider>
          <div className="h-screen flex overflow-hidden">
            <SideNav />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Navbar />
              <main className="flex-1 flex flex-col overflow-hidden">
                {children}
              </main>
            </div>
          </div>
        </ChatProvider>
      </body>
    </html>
  );
}
