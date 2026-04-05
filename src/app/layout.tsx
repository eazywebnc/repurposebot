import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "RepurposeBot - One Article. Five Social Posts. Zero Effort.",
  description:
    "Transform your blog articles into perfectly crafted social media posts for Twitter, LinkedIn, Facebook, Instagram, and more. AI-powered content repurposing.",
  keywords: [
    "content repurposing",
    "social media",
    "AI",
    "blog to social",
    "marketing automation",
  ],
  metadataBase: new URL("https://repurposebot.eazyweb.nc"),
  openGraph: {
    title: "RepurposeBot - One Article. Five Social Posts. Zero Effort.",
    description:
      "Transform your blog articles into perfectly crafted social media posts. AI-powered content repurposing.",
    url: "https://repurposebot.eazyweb.nc",
    siteName: "RepurposeBot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RepurposeBot",
    description:
      "Transform your blog articles into social media posts with AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
