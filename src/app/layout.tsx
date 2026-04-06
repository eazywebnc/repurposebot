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
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
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
    images: [{ url: '/images/og-image.webp', width: 1200, height: 630, type: 'image/webp', alt: 'RepurposeBot — One Article. Five Social Posts. Zero Effort.' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RepurposeBot",
    description:
      "Transform your blog articles into social media posts with AI.",
    images: ['/images/og-image.webp'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "RepurposeBot",
        url: "https://repurposebot.eazyweb.nc",
        publisher: {
          "@type": "Organization",
          name: "EazyWebNC",
          url: "https://eazyweb.nc",
          logo: { "@type": "ImageObject", url: "https://eazyweb.nc/logo.png" },
        },
      },
      {
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
          { "@type": "Offer", price: "49", priceCurrency: "USD", name: "Business" },
        ],
        creator: { "@type": "Organization", name: "EazyWebNC", url: "https://eazyweb.nc" },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is RepurposeBot?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "RepurposeBot is an AI-powered tool that transforms your blog articles into social media posts for Twitter, LinkedIn, Facebook, Instagram, and more — in seconds.",
            },
          },
          {
            "@type": "Question",
            name: "Which social platforms does RepurposeBot support?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "RepurposeBot generates content for Twitter/X, LinkedIn, Facebook, Instagram, and more. Each post is optimized for the specific platform's format and audience.",
            },
          },
          {
            "@type": "Question",
            name: "How does AI content repurposing work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Paste your blog article and RepurposeBot's AI reads, summarizes, and rewrites it into platform-specific posts. Each version is tailored for tone, length, and hashtags.",
            },
          },
        ],
      },
    ],
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
