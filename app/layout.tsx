import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Inter (latin, variable 300-900) kept in the repo, so builds never depend on Google Fonts being reachable
const inter = localFont({
  src: "./fonts/inter-latin-var.woff2",
  variable: "--font-inter",
  weight: "300 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Benzadid Intelligence — AI Websites, Agents & Automation",
  description: "AI-powered websites, automation agents, AI audit consultancy, and mentorship for professionals.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "any" },
    ],
    apple: { url: "/icon.png", sizes: "any" },
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-brand-black text-white antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
