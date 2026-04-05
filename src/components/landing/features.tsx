"use client";


import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  Wand2,
  Share2,
  Clock,
  Palette,
  BarChart3,
  Shield,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Platform icons (inline SVGs for the "7+ Social Platforms" card)    */
/* ------------------------------------------------------------------ */

interface PlatformDef {
  name: string;
  color: string;
  path: string;
  viewBox?: string;
}

const platforms: PlatformDef[] = [
  {
    name: "Twitter / X",
    color: "#1DA1F2",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "LinkedIn",
    color: "#0A66C2",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    name: "Instagram",
    color: "#E4405F",
    path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z",
  },
  {
    name: "TikTok",
    color: "#00F2EA",
    path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
  {
    name: "Threads",
    color: "#FFFFFF",
    path: "M16.556 12.346c-.07-.035-.147-.068-.224-.1a8.03 8.03 0 00-.239-.844c-.663-1.793-1.96-2.782-3.655-2.793h-.028c-1.013 0-1.854.393-2.432 1.136l1.162.81c.398-.511.95-.608 1.28-.608h.02c.494.003.868.147 1.11.428.177.205.295.488.354.846a8.372 8.372 0 00-1.554-.087c-2.19.127-3.598 1.405-3.494 3.17.053.896.504 1.666 1.27 2.168.648.425 1.482.64 2.349.604 1.144-.047 2.04-.494 2.664-1.327.473-.632.77-1.444.895-2.454.536.323.934.747 1.152 1.263.37.875.391 2.313-.794 3.497-1.04 1.04-2.29 1.49-4.16 1.504-2.08-.016-3.652-.683-4.674-1.983-.954-1.214-1.447-2.952-1.466-5.163.019-2.211.512-3.949 1.466-5.163 1.022-1.3 2.594-1.967 4.674-1.983 2.097.016 3.692.687 4.74 1.993.51.636.897 1.432 1.155 2.37l1.375-.366a9.386 9.386 0 00-1.38-2.84C15.728 4.656 13.827 3.86 11.477 3.84h-.007c-2.347.02-4.233.82-5.603 2.378C4.709 7.603 4.127 9.663 4.105 12.13v.014c.022 2.467.604 4.527 1.762 5.912 1.37 1.558 3.256 2.358 5.603 2.378h.007c2.244-.016 3.82-.608 5.128-1.915 1.714-1.714 1.672-3.844 1.11-5.17-.403-.951-1.16-1.723-2.159-2.203zm-3.723 3.512c-.96.04-1.956-.376-2.01-1.283-.04-.67.476-1.418 2.094-1.512.184-.01.364-.016.54-.016a6.41 6.41 0 011.257.126c-.143 2.166-1.068 2.648-1.881 2.685z",
  },
  {
    name: "Bluesky",
    color: "#0085FF",
    path: "M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.785 2.627 3.603 3.496 6.191 3.085-4.413.745-8.298 2.637-4.757 8.273C4.879 25.421 13.248 24.206 12 17.775c-1.248 6.431 7.121 7.646 9.942 3.83 3.541-5.636-.344-7.528-4.757-8.273 2.588.41 5.406-.458 6.191-3.085C23.622 9.418 24 4.458 24 3.768c0-.688-.139-1.86-.902-2.203-.659-.3-1.664-.62-4.3 1.24C16.046 4.747 13.087 8.686 12 10.8z",
  },
];

/* ------------------------------------------------------------------ */
/*  Content transformation mock data                                   */
/* ------------------------------------------------------------------ */

interface TransformItem {
  label: string;
  color: string;
  text: string;
}

const transformations: TransformItem[] = [
  {
    label: "Tweet",
    color: "#1DA1F2",
    text: "Just published: 5 ways AI is transforming content marketing in 2026. Thread below...",
  },
  {
    label: "LinkedIn",
    color: "#0A66C2",
    text: "I spent 3 months researching AI-driven content strategies. Here are 5 insights that changed everything.",
  },
  {
    label: "Instagram",
    color: "#E4405F",
    text: "AI + Content = Magic. Swipe to discover the 5 strategies every creator needs in 2026.",
  },
];

/* ------------------------------------------------------------------ */
/*  Feature data                                                       */
/* ------------------------------------------------------------------ */

interface FeatureDef {
  icon: LucideIcon;
  title: string;
  description: string;
  wide?: boolean;
}

const features: FeatureDef[] = [
  {
    icon: Wand2,
    title: "AI-Powered Generation",
    description:
      "Our AI reads your article and creates perfectly adapted posts for each platform, respecting character limits and best practices.",
    wide: true,
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
    icon: Share2,
    title: "7+ Social Platforms",
    description:
      "Twitter/X, LinkedIn, Facebook, Instagram, Threads, Bluesky, Mastodon. All from a single article input.",
    wide: true,
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

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const platformVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const platformIconVariant: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

const lineVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25, delayChildren: 0.2 } },
};

const lineChild: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ------------------------------------------------------------------ */
/*  Sub-components for visual cards                                    */
/* ------------------------------------------------------------------ */

function ContentTransformVisual() {
  return (
    <motion.div
      className="mt-6 space-y-3 overflow-hidden"
      variants={lineVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Source article mock */}
      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-violet-400" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-violet-400">
            Article
          </span>
        </div>
        <div className="space-y-1.5">
          <div className="h-2 w-full rounded-full bg-white/10" />
          <div className="h-2 w-4/5 rounded-full bg-white/10" />
          <div className="h-2 w-3/5 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Animated arrow */}
      <motion.div
        className="flex justify-center text-violet-500"
        animate={{ y: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 4v12m0 0l-4-4m4 4l4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Generated outputs */}
      {transformations.map((t) => (
        <motion.div
          key={t.label}
          variants={lineChild}
          className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
        >
          <div className="mb-1.5 flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: t.color }}
            />
            <span
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: t.color }}
            >
              {t.label}
            </span>
          </div>
          <p className="text-xs leading-relaxed text-gray-400">{t.text}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

function PlatformIconsVisual() {
  return (
    <motion.div
      className="mt-6 flex flex-wrap items-center justify-center gap-4"
      variants={platformVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {platforms.map((p) => (
        <motion.div
          key={p.name}
          variants={platformIconVariant}
          whileHover={{ scale: 1.15, rotate: -4 }}
          className="group/icon flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors hover:border-white/20 hover:bg-white/[0.07]"
          title={p.name}
        >
          <svg
            viewBox={p.viewBox ?? "0 0 24 24"}
            className="h-6 w-6 transition-transform"
            style={{ fill: p.color }}
          >
            <path d={p.path} />
          </svg>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Features component                                            */
/* ------------------------------------------------------------------ */

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.3]);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative overflow-hidden py-28 px-4"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-violet-600/5 blur-[120px]" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-purple-600/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
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

        {/* Bento Grid */}
        <motion.div
          style={{ y: gridY, opacity: gridOpacity }}
          className="grid gap-5 md:grid-cols-3"
        >
          {features.map((feature, index) => {
            const isAI = feature.title === "AI-Powered Generation";
            const isPlatforms = feature.title === "7+ Social Platforms";
            const isWide = feature.wide;

            return (
              <motion.div
                key={feature.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className={`group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all duration-300 hover:border-violet-500/30 hover:bg-white/[0.04] ${
                  isWide ? "md:col-span-2" : "md:col-span-1"
                }`}
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(600px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(139,92,246,0.06),transparent_40%)]" />

                {/* Icon */}
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/20 to-purple-600/20 text-violet-400 transition-colors group-hover:from-violet-600/30 group-hover:to-purple-600/30">
                  <feature.icon className="h-6 w-6" />
                </div>

                {/* Text */}
                <h3 className="mb-3 text-lg font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Visual elements for wide cards */}
                {isAI && <ContentTransformVisual />}
                {isPlatforms && <PlatformIconsVisual />}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Feature Screenshots */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]"
          >
            <Image
              src="/images/feature-1.webp"
              alt="AI content transformation and adaptation"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]"
          >
            <Image
              src="/images/feature-2.webp"
              alt="Multi-platform content publishing workflow"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
