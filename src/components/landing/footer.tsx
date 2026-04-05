"use client";

import Link from "next/link";
import { Zap } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "API Docs", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "mailto:contact@eazyweb.nc" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a] px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-purple-600">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Repurpose<span className="text-violet-400">Bot</span>
              </span>
            </Link>
            <p className="mb-4 text-sm text-gray-500 leading-relaxed">
              Transform your blog content into perfectly crafted social media
              posts with AI. Save hours every week.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/5 pt-8 sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} RepurposeBot. All rights reserved.
          </p>
          <p className="text-sm text-gray-600">
            Built by{" "}
            <a
              href="https://eazyweb.nc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 transition-colors hover:text-violet-300"
            >
              EazyWebNC
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
