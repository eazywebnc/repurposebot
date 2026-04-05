"use client";

import { motion } from "framer-motion";
import {
  Wand2,
  Share2,
  Clock,
  Palette,
  BarChart3,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "AI-Powered Generation",
    description:
      "Our AI reads your article and creates perfectly adapted posts for each platform, respecting character limits and best practices.",
  },
  {
    icon: Share2,
    title: "7+ Social Platforms",
    description:
      "Twitter/X, LinkedIn, Facebook, Instagram, Threads, Bluesky, Mastodon. All from a single article input.",
  },
  {
    icon: Palette,
    title: "Custom Tone & Voice",
    description:
      "Professional, casual, witty, or your own brand voice. Train the AI to match your unique style perfectly.",
  },
  {
    icon: Clock,
    title: "Smart Scheduling",
    description:
      "Schedule posts at optimal times for each platform. Set it once and let RepurposeBot handle the rest.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Track engagement across platforms. See which content types perform best and optimize your strategy.",
  },
  {
    icon: Shield,
    title: "Team Collaboration",
    description:
      "Invite team members, set permissions, and maintain consistent brand voice across your entire content team.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 px-4">
      <div className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-violet-600/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Repurpose Content
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Stop spending hours rewriting your blog posts for social media. Let
            AI do the heavy lifting while you focus on creating great content.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-300 hover:border-violet-500/30 hover:bg-white/[0.04]"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/20 to-purple-600/20 text-violet-400 transition-colors group-hover:from-violet-600/30 group-hover:to-purple-600/30">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
