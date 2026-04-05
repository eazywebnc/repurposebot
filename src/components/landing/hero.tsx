"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Sparkles,
  FileText,
  AtSign,
  Briefcase,
  Camera,
  Mail,
  Clapperboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Pipeline data                                                      */
/* ------------------------------------------------------------------ */

const outputPlatforms = [
  {
    id: "tweet",
    label: "Tweet Thread",
    icon: AtSign,
    color: "from-sky-400 to-sky-600",
    borderColor: "border-sky-500/30",
    bgColor: "bg-sky-500/10",
    textColor: "text-sky-300",
    snippet: "We just discovered that 73% of content marketers waste 6+ hrs/week...\n\nHere's the thread",
    angle: -30,
  },
  {
    id: "linkedin",
    label: "LinkedIn Post",
    icon: Briefcase,
    color: "from-blue-400 to-blue-600",
    borderColor: "border-blue-500/30",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-300",
    snippet: "I've been studying how top marketers scale their content output.\n\nThe secret? Repurpose smarter.",
    angle: -15,
  },
  {
    id: "instagram",
    label: "Instagram Caption",
    icon: Camera,
    color: "from-pink-400 to-fuchsia-600",
    borderColor: "border-pink-500/30",
    bgColor: "bg-pink-500/10",
    textColor: "text-pink-300",
    snippet: "Content repurposing = the ultimate growth hack.\n\nOne blog post \u2192 7 social posts \u2192 10x reach.",
    angle: 0,
  },
  {
    id: "email",
    label: "Email Newsletter",
    icon: Mail,
    color: "from-violet-400 to-purple-600",
    borderColor: "border-violet-500/30",
    bgColor: "bg-violet-500/10",
    textColor: "text-violet-300",
    snippet: "Subject: The repurposing framework that 10x'd our reach\n\nHey [Name], this week we...",
    angle: 15,
  },
  {
    id: "tiktok",
    label: "TikTok Script",
    icon: Clapperboard,
    color: "from-fuchsia-400 to-rose-600",
    borderColor: "border-fuchsia-500/30",
    bgColor: "bg-fuchsia-500/10",
    textColor: "text-fuchsia-300",
    snippet: "[HOOK] Stop spending hours rewriting your content.\n\n[BODY] Here's a 30-second trick...",
    angle: 30,
  },
];

/* ------------------------------------------------------------------ */
/*  AI Particle ring (center zone)                                     */
/* ------------------------------------------------------------------ */

function AiParticles() {
  return (
    <div className="relative w-28 h-28 md:w-36 md:h-36 flex-shrink-0">
      {/* Outer rotating ring */}
      <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-violet-400/60"
            style={{
              top: `${50 + 46 * Math.sin((i * 2 * Math.PI) / 12)}%`,
              left: `${50 + 46 * Math.cos((i * 2 * Math.PI) / 12)}%`,
              transform: "translate(-50%, -50%)",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
      {/* Inner pulsing ring */}
      <div className="absolute inset-3 animate-[spin_6s_linear_infinite_reverse]">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-fuchsia-400/50"
            style={{
              top: `${50 + 44 * Math.sin((i * 2 * Math.PI) / 8)}%`,
              left: `${50 + 44 * Math.cos((i * 2 * Math.PI) / 8)}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>
      {/* Center glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 border border-violet-500/30 flex items-center justify-center animate-pulse shadow-[0_0_40px_rgba(139,92,246,0.3)]">
          <Sparkles className="w-7 h-7 md:w-9 md:h-9 text-violet-300" />
        </div>
      </div>
      {/* Ambient glow behind */}
      <div className="absolute -inset-6 rounded-full bg-violet-500/10 blur-2xl pointer-events-none" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Source article card                                                 */
/* ------------------------------------------------------------------ */

function SourceCard() {
  return (
    <div className="pipeline-source relative w-full max-w-xs flex-shrink-0 rounded-2xl border border-white/[0.08] bg-[#0c0918]/80 p-5 shadow-xl shadow-violet-500/5 backdrop-blur-xl">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
          <FileText className="w-4 h-4 text-violet-400" />
        </div>
        <span className="text-xs font-medium text-violet-300">Blog Post</span>
      </div>
      <h4 className="text-sm font-semibold text-white mb-2 leading-snug">
        The Future of Content Marketing: AI-Powered Repurposing
      </h4>
      <div className="space-y-1.5 mb-3">
        <div className="h-1.5 w-full rounded-full bg-white/[0.06]" />
        <div className="h-1.5 w-[90%] rounded-full bg-white/[0.05]" />
        <div className="h-1.5 w-[75%] rounded-full bg-white/[0.04]" />
        <div className="h-1.5 w-[85%] rounded-full bg-white/[0.04]" />
        <div className="h-1.5 w-[60%] rounded-full bg-white/[0.03]" />
      </div>
      <div className="flex items-center gap-2 text-[10px] text-zinc-500">
        <span>1,847 words</span>
        <span>&middot;</span>
        <span>7 min read</span>
      </div>
      {/* Glow */}
      <div className="absolute -inset-3 rounded-3xl bg-violet-500/5 blur-xl pointer-events-none -z-10" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Output platform card                                               */
/* ------------------------------------------------------------------ */

function OutputCard({
  platform,
  index,
}: {
  platform: (typeof outputPlatforms)[number];
  index: number;
}) {
  const Icon = platform.icon;
  return (
    <div
      className={`pipeline-output pipeline-output-${index} w-full max-w-[220px] flex-shrink-0 rounded-xl border ${platform.borderColor} bg-[#0c0918]/80 p-3.5 shadow-lg backdrop-blur-xl`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className={`w-6 h-6 rounded-md ${platform.bgColor} flex items-center justify-center`}
        >
          <Icon className={`w-3.5 h-3.5 ${platform.textColor}`} />
        </div>
        <span className={`text-[11px] font-semibold ${platform.textColor}`}>
          {platform.label}
        </span>
      </div>
      <p className="text-[10px] text-zinc-400 leading-relaxed whitespace-pre-line line-clamp-3">
        {platform.snippet}
      </p>
      <div className="mt-2 flex items-center gap-1">
        <div className="px-1.5 py-0.5 rounded text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/15">
          Ready
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Arrow connector                                                    */
/* ------------------------------------------------------------------ */

function PipelineArrow({ className = "" }: { className?: string }) {
  return (
    <div className={`pipeline-arrow flex items-center ${className}`}>
      {/* Horizontal on desktop, vertical on mobile */}
      <div className="hidden md:block w-12 lg:w-20 h-px bg-gradient-to-r from-violet-500/50 to-fuchsia-500/50 relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-fuchsia-500/60 border-y-[4px] border-y-transparent" />
        {/* Glow dot traveling */}
        <div className="pipeline-dot absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
      </div>
      <div className="md:hidden h-10 w-px bg-gradient-to-b from-violet-500/50 to-fuchsia-500/50 relative mx-auto">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-t-[6px] border-t-fuchsia-500/60 border-x-[4px] border-x-transparent" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* -- Initial hidden state for pipeline elements -- */
      gsap.set(".pipeline-source", { opacity: 0, x: -60 });
      gsap.set(".pipeline-arrow", { opacity: 0, scaleX: 0 });
      gsap.set(".pipeline-dot", { left: "0%" });
      gsap.set(".pipeline-ai-zone", { opacity: 0, scale: 0.6 });
      gsap.set(".pipeline-output", { opacity: 0, x: 40, y: 20 });

      /* -- ScrollTrigger master timeline -- */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pipelineRef.current,
          start: "top 85%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      });

      // Stage 1: Article slides in
      tl.to(".pipeline-source", {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      // Stage 2: First arrow appears
      tl.to(
        ".pipeline-arrow-1",
        { opacity: 1, scaleX: 1, duration: 0.4, ease: "power2.out" },
        "-=0.2"
      );

      // Dot travels along first arrow
      tl.to(
        ".pipeline-arrow-1 .pipeline-dot",
        { left: "100%", duration: 0.5, ease: "power1.inOut" },
        "-=0.1"
      );

      // Stage 3: AI zone pulses in
      tl.to(
        ".pipeline-ai-zone",
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      );

      // Stage 4: Second arrow
      tl.to(
        ".pipeline-arrow-2",
        { opacity: 1, scaleX: 1, duration: 0.4, ease: "power2.out" },
        "-=0.1"
      );

      tl.to(
        ".pipeline-arrow-2 .pipeline-dot",
        { left: "100%", duration: 0.5, ease: "power1.inOut" },
        "-=0.1"
      );

      // Stage 5: Output cards fan out one by one
      outputPlatforms.forEach((_, i) => {
        tl.to(
          `.pipeline-output-${i}`,
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.4,
            ease: "back.out(1.4)",
          },
          i === 0 ? "-=0.1" : "-=0.25"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-20 min-h-screen"
    >
      {/* ---- Gradient Mesh Background ---- */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 80% 60% at 10% 20%, rgba(139,92,246,0.12) 0%, transparent 60%)",
            "radial-gradient(ellipse 60% 80% at 85% 15%, rgba(217,70,239,0.10) 0%, transparent 55%)",
            "radial-gradient(ellipse 70% 50% at 50% 80%, rgba(99,102,241,0.10) 0%, transparent 50%)",
            "radial-gradient(ellipse 50% 70% at 25% 60%, rgba(192,38,211,0.08) 0%, transparent 55%)",
            "radial-gradient(ellipse 40% 40% at 75% 55%, rgba(139,92,246,0.09) 0%, transparent 50%)",
            "radial-gradient(ellipse 90% 40% at 50% 10%, rgba(168,85,247,0.14) 0%, transparent 50%)",
            "radial-gradient(ellipse 30% 50% at 90% 80%, rgba(236,72,153,0.07) 0%, transparent 50%)",
          ].join(", "),
        }}
      />

      {/* Soft blurred orbs for depth */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-purple-600/[0.08] blur-[100px]" />
        <div className="absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-fuchsia-600/[0.08] blur-[80px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { top: "12%", left: "8%", size: 3, delay: 0, duration: 6 },
          { top: "25%", left: "92%", size: 2, delay: 1.2, duration: 7 },
          { top: "68%", left: "15%", size: 2.5, delay: 0.5, duration: 8 },
          { top: "45%", left: "78%", size: 2, delay: 2.5, duration: 5 },
          { top: "80%", left: "55%", size: 3, delay: 1.8, duration: 9 },
          { top: "35%", left: "40%", size: 1.5, delay: 3, duration: 6.5 },
          { top: "58%", left: "88%", size: 2, delay: 0.8, duration: 7.5 },
          { top: "15%", left: "60%", size: 2.5, delay: 2, duration: 8 },
          { top: "90%", left: "25%", size: 2, delay: 1.5, duration: 6 },
          { top: "5%", left: "45%", size: 1.5, delay: 3.5, duration: 7 },
          { top: "72%", left: "70%", size: 3, delay: 0.3, duration: 9 },
          { top: "50%", left: "5%", size: 2, delay: 2.8, duration: 5.5 },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-violet-400/40"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              animation: `heroFloat ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            }}
          />
        ))}
        <style jsx>{`
          @keyframes heroFloat {
            0% { transform: translateY(0px) scale(1); opacity: 0.3; }
            50% { opacity: 0.7; }
            100% { transform: translateY(-20px) scale(1.3); opacity: 0.2; }
          }
        `}</style>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full">
        {/* ================================================================ */}
        {/*  CONTENT TRANSFORMATION PIPELINE                                 */}
        {/* ================================================================ */}
        <div
          ref={pipelineRef}
          className="mb-16 md:mb-20"
        >
          {/* Desktop: horizontal pipeline */}
          <div className="hidden md:flex items-center justify-center gap-0">
            {/* Source article */}
            <SourceCard />

            {/* Arrow 1 */}
            <PipelineArrow className="pipeline-arrow-1" />

            {/* AI Processing zone */}
            <div className="pipeline-ai-zone">
              <AiParticles />
            </div>

            {/* Arrow 2 */}
            <PipelineArrow className="pipeline-arrow-2" />

            {/* Output cards fanning out */}
            <div className="flex flex-col gap-2.5 items-start">
              {outputPlatforms.map((platform, i) => (
                <OutputCard key={platform.id} platform={platform} index={i} />
              ))}
            </div>
          </div>

          {/* Mobile: vertical pipeline */}
          <div className="flex md:hidden flex-col items-center gap-0">
            {/* Source article */}
            <SourceCard />

            {/* Arrow 1 */}
            <PipelineArrow className="pipeline-arrow-1" />

            {/* AI Processing zone */}
            <div className="pipeline-ai-zone">
              <AiParticles />
            </div>

            {/* Arrow 2 */}
            <PipelineArrow className="pipeline-arrow-2" />

            {/* Output cards stacked */}
            <div className="flex flex-col gap-3 items-center w-full">
              {outputPlatforms.map((platform, i) => (
                <OutputCard key={platform.id} platform={platform} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/*  HEADLINE, SUBTEXT & CTAs (below the pipeline)                   */}
        {/* ================================================================ */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300"
          >
            <Sparkles className="h-4 w-4" />
            AI-Powered Content Pipeline
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl"
          >
            One Blog Post.{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Five Platforms.
            </span>
            <br />
            Instant Content.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 sm:text-xl"
          >
            Paste your article and watch AI transform it into perfectly tailored
            posts for Twitter, LinkedIn, Instagram, email newsletters, and TikTok
            scripts -- all in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link href="/auth/login">
              <Button size="xl" className="group">
                Start Repurposing Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="secondary" size="xl">
                See How It Works
              </Button>
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-14 grid grid-cols-3 gap-8 border-t border-white/10 pt-10 max-w-lg mx-auto"
          >
            {[
              { value: "5+", label: "Output Formats" },
              { value: "30s", label: "Average Transform" },
              { value: "Free", label: "To Get Started" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, type: "spring", stiffness: 80 }}
            className="mt-16 relative max-w-5xl mx-auto"
          >
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/10 to-violet-500/20 rounded-3xl blur-2xl opacity-50" />
            <div style={{ perspective: "1200px" }}>
              <motion.div
                initial={{ rotateX: 6, scale: 0.97 }}
                whileInView={{ rotateX: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{ transformOrigin: "center top" }}
              >
                <Image
                  src="/images/dashboard.webp"
                  alt="RepurposeBot Dashboard"
                  width={1200}
                  height={675}
                  className="rounded-2xl border border-white/10 shadow-2xl shadow-black/50"
                  priority
                />
              </motion.div>
            </div>
            {/* Bottom glow */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-violet-500/20 blur-[50px] rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
