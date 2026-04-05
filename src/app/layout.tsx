import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
  alternates: {
    canonical: 'https://repurposebot.eazyweb.nc',
  },
  metadataBase: new URL("https://repurposebot.eazyweb.nc"),
  openGraph: {
    title: "RepurposeBot - One Article. Five Social Posts. Zero Effort.",
    description:
      "Transform your blog articles into perfectly crafted social media posts. AI-powered content repurposing.",
    url: "https://repurposebot.eazyweb.nc",
    siteName: "RepurposeBot",
    type: "website",
    locale: "en_US",
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'RepurposeBot — One Article. Five Social Posts. Zero Effort.' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RepurposeBot",
    description:
      "Transform your blog articles into social media posts with AI.",
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "RepurposeBot",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Transform your blog articles into perfectly crafted social media posts. AI-powered content repurposing for Twitter, LinkedIn, Facebook, and more.",
    url: "https://repurposebot.eazyweb.nc",
    offers: [
      { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free" },
      { "@type": "Offer", price: "19", priceCurrency: "USD", name: "Pro" },
      {
        "@type": "Offer",
        price: "49",
        priceCurrency: "USD",
        name: "Business",
      },
    ],
    creator: {
      "@type": "Organization",
      name: "EazyWebNC",
      url: "https://eazyweb.nc",
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${sora.variable} ${inter.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-orange-600 focus:text-white focus:rounded"
        >
          Skip to content
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
