"use client";

import { motion } from "framer-motion";
import { FileText, Cpu, Send } from "lucide-react";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Paste Your Article",
    description:
      "Drop in your blog post URL or paste the content directly. Our AI will analyze the structure, key points, and messaging.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Generates Posts",
    description:
      "In seconds, get tailored posts for every platform. Each one is optimized for the specific format, tone, and audience.",
  },
  {
    icon: Send,
    step: "03",
    title: "Review & Publish",
    description:
      "Edit if needed, schedule the posts, and watch your content reach audiences across every major social platform.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 px-4">
      <div className="pointer-events-none absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-purple-600/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Three Steps.{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Infinite Reach.
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            From blog post to social media presence in under a minute.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-16 hidden h-px w-full translate-x-1/2 bg-gradient-to-r from-violet-500/50 to-transparent md:block" />
              )}
              <div className="relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-500/20">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <div className="mb-2 text-xs font-bold uppercase tracking-widest text-violet-400">
                  Step {item.step}
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
