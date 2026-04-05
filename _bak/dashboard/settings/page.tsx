"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  Crown,
  CreditCard,
  Palette,
  Check,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { PLANS, type PlanId } from "@/lib/stripe";
import { getPlanColor } from "@/lib/utils";
import type { Settings } from "@/lib/types";

const tones = [
  "professional",
  "casual",
  "witty",
  "inspirational",
  "educational",
  "conversational",
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [defaultTone, setDefaultTone] = useState("professional");
  const [brandVoice, setBrandVoice] = useState("");
  const [upgrading, setUpgrading] = useState<PlanId | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("rb_settings")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setSettings(data);
        setDefaultTone(data.default_tone || "professional");
        setBrandVoice(data.brand_voice || "");
      }
      setLoading(false);
    }

    fetchSettings();
  }, []);

  async function saveSettings() {
    if (!settings) return;
    setSaving(true);

    const supabase = createClient();
    await supabase
      .from("rb_settings")
      .update({
        default_tone: defaultTone,
        brand_voice: brandVoice || null,
      })
      .eq("id", settings.id);

    setSaving(false);
  }

  async function handleUpgrade(planId: PlanId) {
    if (planId === "free") return;
    setUpgrading(planId);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setUpgrading(null);
    }
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  const currentPlan = settings?.plan || "free";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-gray-400">
          Manage your account, subscription, and preferences.
        </p>
      </div>

      {/* Current plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-violet-400" />
              Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-600">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className={`text-lg font-bold ${getPlanColor(currentPlan)}`}>
                  {PLANS[currentPlan as PlanId].name} Plan
                </p>
                <p className="text-sm text-gray-400">
                  {PLANS[currentPlan as PlanId].price === 0
                    ? "Free forever"
                    : `$${PLANS[currentPlan as PlanId].price}/month`}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {(["free", "pro", "business"] as PlanId[]).map((planId) => {
                const plan = PLANS[planId];
                const isCurrent = currentPlan === planId;

                return (
                  <div
                    key={planId}
                    className={`rounded-xl border p-4 ${
                      isCurrent
                        ? "border-violet-500/50 bg-violet-500/5"
                        : "border-white/10 bg-white/[0.02]"
                    }`}
                  >
                    <p className="mb-1 font-bold text-white">{plan.name}</p>
                    <p className="mb-3 text-2xl font-extrabold text-white">
                      {plan.price === 0 ? "Free" : `$${plan.price}`}
                      {plan.price > 0 && (
                        <span className="text-sm font-normal text-gray-500">
                          /mo
                        </span>
                      )}
                    </p>
                    <ul className="mb-4 space-y-1.5">
                      {plan.features.slice(0, 4).map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-xs text-gray-400"
                        >
                          <Check className="mt-0.5 h-3 w-3 shrink-0 text-violet-400" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {isCurrent ? (
                      <Button variant="secondary" size="sm" className="w-full" disabled>
                        Current Plan
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="w-full"
                        variant={planId === "pro" ? "default" : "secondary"}
                        onClick={() => handleUpgrade(planId)}
                        disabled={upgrading !== null || planId === "free"}
                      >
                        {upgrading === planId ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : planId === "free" ? (
                          "Downgrade"
                        ) : (
                          "Upgrade"
                        )}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-purple-400" />
              Content Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Default tone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Default Tone
              </label>
              <div className="flex flex-wrap gap-2">
                {tones.map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setDefaultTone(tone)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      defaultTone === tone
                        ? "bg-violet-500/20 text-violet-400 border border-violet-500/50"
                        : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {tone.charAt(0).toUpperCase() + tone.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand voice */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Brand Voice Description
              </label>
              <textarea
                value={brandVoice}
                onChange={(e) => setBrandVoice(e.target.value)}
                placeholder="Describe your brand voice... e.g., 'Friendly and approachable, uses simple language, occasionally humorous'"
                rows={4}
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white placeholder:text-gray-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 resize-none"
              />
              <p className="mt-1.5 text-xs text-gray-500">
                {currentPlan === "free"
                  ? "Upgrade to Pro to use custom brand voice."
                  : "The AI will adapt its output to match this voice."}
              </p>
            </div>

            <Button
              onClick={saveSettings}
              disabled={saving}
              className="gap-2"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <SettingsIcon className="h-4 w-4" />
              )}
              Save Preferences
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
