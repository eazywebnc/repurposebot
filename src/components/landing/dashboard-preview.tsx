"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function DashboardPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);

  return (
    <section
      ref={containerRef}
      className="relative px-4 py-20 md:py-28 overflow-hidden"
    >
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Your{" "}
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            Command Center
          </span>
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Manage all your repurposed content from one intuitive dashboard.
        </p>
      </motion.div>

      {/* Browser frame with parallax */}
      <motion.div
        style={{ y, scale, opacity }}
        className="relative mx-auto max-w-5xl"
      >
        {/* Violet glow behind the frame */}
        <div className="absolute -inset-4 md:-inset-8 rounded-3xl bg-violet-500/10 blur-3xl pointer-events-none" />

        {/* Browser chrome */}
        <div className="relative rounded-xl md:rounded-2xl border border-white/[0.08] bg-[#0c0918]/90 shadow-2xl shadow-violet-500/15 backdrop-blur-xl overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1 rounded-md bg-white/[0.05] border border-white/[0.06] text-xs text-zinc-500 font-mono">
                app.repurposebot.com/dashboard
              </div>
            </div>
            <div className="w-[52px]" /> {/* Spacer for symmetry */}
          </div>

          {/* Dashboard image */}
          <div className="relative">
            <Image
              src="/images/dashboard.webp"
              alt="RepurposeBot Dashboard — manage all your repurposed content"
              width={1920}
              height={1080}
              className="w-full h-auto"
              quality={90}
              priority={false}
            />
            {/* Subtle gradient fade at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
