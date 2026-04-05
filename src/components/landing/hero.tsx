"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  FileText,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Hash,
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  CheckCircle2,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Content Transformation Mockup                                      */
/* ------------------------------------------------------------------ */

const socialOutputs = [
  {
    platform: "Twitter",
    icon: Twitter,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/15",
    content:
      "🚀 We just discovered that 73% of content marketers waste 6+ hours/week on repurposing.\n\nWhat if AI could do it in 30 seconds?\n\nHere's what we learned about the future of content...\n\n🧵 Thread 👇",
    metrics: { likes: "2.4K", retweets: "847", replies: "132" },
  },
  {
    platform: "LinkedIn",
    icon: Linkedin,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/15",
    content:
      "I've been studying how top marketers scale their content output.\n\nThe secret? They don't create more. They repurpose smarter.\n\nHere are 5 frameworks that helped us 10x our reach →",
    metrics: { likes: "1.8K", comments: "234", shares: "89" },
  },
  {
    platform: "Instagram",
    icon: Instagram,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/15",
    content:
      "📊 Content repurposing = the ultimate growth hack.\n\nOne blog post → 7 social posts → 10x reach.\n\nSwipe to see the exact workflow →",
    metrics: { likes: "5.2K", comments: "312" },
  },
];

function TransformationMockup() {
  return (
    <div className="relative w-full rounded-2xl border border-white/[0.08] bg-[#0a0812]/80 overflow-hidden shadow-2xl shadow-violet-500/10 backdrop-blur-xl">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-[11px] text-zinc-500 ml-2">RepurposeBot — Content Studio</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-violet-500/10 border border-violet-500/15">
          <Wand2 className="w-3 h-3 text-violet-400" />
          <span className="text-[10px] text-violet-400 font-medium">AI Transforming...</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-0">
        {/* Left — Source article */}
        <div className="col-span-4 p-4 border-r border-white/[0.06]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-1.5 mb-3">
              <FileText className="w-3 h-3 text-violet-400" />
              <span className="text-[10px] font-medium text-violet-300">Source Article</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
            >
              <h4 className="text-[11px] font-semibold text-white mb-2">
                The Future of Content Marketing: AI-Powered Repurposing
              </h4>
              <div className="space-y-1.5">
                {[1, 2, 3, 4].map((_, i) => (
                  <div
                    key={i}
                    className="h-1.5 rounded-full bg-white/[0.04]"
                    style={{ width: `${85 - i * 12}%` }}
                  />
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2 text-[9px] text-zinc-600">
                <span>1,847 words</span>
                <span>·</span>
                <span>7 min read</span>
              </div>
            </motion.div>

            {/* Transformation arrow */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="flex flex-col items-center my-3 origin-top"
            >
              <div className="w-px h-6 bg-gradient-to-b from-violet-500/40 to-fuchsia-500/40" />
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/20 flex items-center justify-center"
              >
                <Sparkles className="w-3 h-3 text-violet-400" />
              </motion.div>
              <div className="w-px h-6 bg-gradient-to-b from-fuchsia-500/40 to-violet-500/40" />
            </motion.div>

            {/* Platforms output */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="space-y-1.5"
            >
              <p className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1.5 font-medium">Generated for</p>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { icon: Twitter, label: "Twitter", color: "text-sky-400", bg: "bg-sky-500/10" },
                  { icon: Linkedin, label: "LinkedIn", color: "text-blue-400", bg: "bg-blue-500/10" },
                  { icon: Instagram, label: "Instagram", color: "text-pink-400", bg: "bg-pink-500/10" },
                  { icon: Facebook, label: "Facebook", color: "text-blue-400", bg: "bg-blue-500/10" },
                  { icon: Hash, label: "TikTok", color: "text-zinc-300", bg: "bg-zinc-500/10" },
                ].map((p, i) => (
                  <motion.div
                    key={p.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 + i * 0.08 }}
                    className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg ${p.bg} border border-white/[0.04]`}
                  >
                    <p.icon className={`w-3 h-3 ${p.color}`} />
                    <span className="text-[9px] text-zinc-300">{p.label}</span>
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 ml-auto" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right — Generated posts */}
        <div className="col-span-8 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-medium text-zinc-300">Generated Posts</span>
            <span className="text-[9px] text-zinc-600">5 posts · 12 seconds</span>
          </div>

          <div className="space-y-2.5">
            {socialOutputs.map((post, i) => (
              <motion.div
                key={post.platform}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.2, type: "spring", stiffness: 150 }}
                className={`p-3 rounded-xl bg-white/[0.02] border ${post.border} hover:bg-white/[0.04] transition-colors`}
              >
                {/* Platform header */}
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-5 h-5 rounded-md ${post.bg} flex items-center justify-center`}>
                    <post.icon className={`w-3 h-3 ${post.color}`} />
                  </div>
                  <span className={`text-[10px] font-medium ${post.color}`}>{post.platform}</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 + i * 0.2 }}
                    className="ml-auto px-1.5 py-0.5 rounded text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/15"
                  >
                    Ready to post
                  </motion.span>
                </div>

                {/* Post content */}
                <p className="text-[10px] text-zinc-300 leading-relaxed whitespace-pre-line mb-2">
                  {post.content}
                </p>

                {/* Metrics preview */}
                <div className="flex items-center gap-3 text-[9px] text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Heart className="w-2.5 h-2.5" />
                    {post.metrics.likes}
                  </span>
                  {"retweets" in post.metrics && (
                    <span className="flex items-center gap-1">
                      <Repeat2 className="w-2.5 h-2.5" />
                      {post.metrics.retweets}
                    </span>
                  )}
                  {"comments" in post.metrics && (
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-2.5 h-2.5" />
                      {post.metrics.comments}
                    </span>
                  )}
                  {"replies" in post.metrics && (
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-2.5 h-2.5" />
                      {post.metrics.replies}
                    </span>
                  )}
                  {"shares" in post.metrics && (
                    <span className="flex items-center gap-1">
                      <Share className="w-2.5 h-2.5" />
                      {post.metrics.shares}
                    </span>
                  )}
                  <span className="ml-auto text-[8px] text-zinc-600 italic">predicted reach</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating badges                                                    */
/* ------------------------------------------------------------------ */

function FloatingBadges() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.0, type: "spring" }}
        className="absolute -right-3 top-16 z-20 hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 backdrop-blur-lg"
      >
        <Sparkles className="w-4 h-4 text-violet-400" />
        <div>
          <p className="text-[10px] font-medium text-violet-300">5 Posts Generated</p>
          <p className="text-[9px] text-zinc-500">in 12 seconds</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.3, type: "spring" }}
        className="absolute -left-3 bottom-28 z-20 hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 backdrop-blur-lg"
      >
        <Heart className="w-4 h-4 text-fuchsia-400" />
        <div>
          <p className="text-[10px] font-medium text-fuchsia-300">10x More Reach</p>
          <p className="text-[9px] text-zinc-500">Same content effort</p>
        </div>
      </motion.div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-16"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-purple-600/8 blur-[100px]" />
        <div className="absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-fuchsia-600/8 blur-[80px]" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl w-full">
        {/* Text */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300"
          >
            <Sparkles className="h-4 w-4" />
            AI-Powered Content Repurposing
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            One Article.{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Five Social Posts.
            </span>
            <br />
            Zero Effort.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 sm:text-xl"
          >
            Transform your blog content into perfectly crafted social media posts
            for Twitter, LinkedIn, Facebook, Instagram, and more. Powered by AI,
            built for marketers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link href="/auth/login">
              <Button size="xl" className="group">
                Get Started Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="secondary" size="xl">
                See How It Works
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-14 grid grid-cols-3 gap-8 border-t border-white/10 pt-10 max-w-lg mx-auto"
          >
            {[
              { value: "7+", label: "Platforms Supported" },
              { value: "10x", label: "Faster Than Manual" },
              { value: "Free", label: "To Get Started" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Transformation Mockup */}
        <motion.div
          style={{ y: mockupY }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 80 }}
          className="relative max-w-5xl mx-auto"
        >
          <FloatingBadges />
          <TransformationMockup />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-violet-500/15 blur-[60px] rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
