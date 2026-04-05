"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="relative py-24 px-4">
      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/10 via-purple-600/5 to-fuchsia-600/10 p-12 text-center sm:p-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-violet-600/10 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-purple-600/10 blur-[80px]" />

          <div className="relative z-10">
            <h2 className="mb-4 text-4xl font-extrabold text-white sm:text-5xl">
              Ready to 10x Your{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Social Reach?
              </span>
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-gray-400">
              Join thousands of content creators who save hours every week with
              RepurposeBot. Start free, no credit card required.
            </p>
            <Link href="/auth/login">
              <Button size="xl" className="group">
                Start Repurposing Now
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
