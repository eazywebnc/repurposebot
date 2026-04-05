"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Share2,
  TrendingUp,
  Crown,
  Plus,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { formatDate, truncate, getPlanColor } from "@/lib/utils";
import type { Article, GeneratedPost, Settings } from "@/lib/types";

interface DashboardData {
  settings: Settings | null;
  recentArticles: Article[];
  recentPosts: GeneratedPost[];
  totalArticles: number;
  totalPosts: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>({
    settings: null,
    recentArticles: [],
    recentPosts: [],
    totalArticles: 0,
    totalPosts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const [settingsRes, articlesRes, postsRes, articleCountRes, postCountRes] =
        await Promise.all([
          supabase
            .from("rb_settings")
            .select("*")
            .eq("user_id", user.id)
            .single(),
          supabase
            .from("rb_articles")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(5),
          supabase
            .from("rb_generated_posts")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(5),
          supabase
            .from("rb_articles")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id),
          supabase
            .from("rb_generated_posts")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id),
        ]);

      setData({
        settings: settingsRes.data,
        recentArticles: articlesRes.data || [],
        recentPosts: postsRes.data || [],
        totalArticles: articleCountRes.count || 0,
        totalPosts: postCountRes.count || 0,
      });
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  const plan = data.settings?.plan || "free";
  const articlesUsed = data.settings?.articles_used || 0;
  const articlesLimit = data.settings?.articles_limit || 5;
  const usagePercent =
    articlesLimit === -1 ? 0 : (articlesUsed / articlesLimit) * 100;

  const stats = [
    {
      label: "Articles",
      value: data.totalArticles,
      icon: FileText,
      color: "from-violet-600 to-purple-600",
    },
    {
      label: "Generated Posts",
      value: data.totalPosts,
      icon: Share2,
      color: "from-purple-600 to-fuchsia-600",
    },
    {
      label: "Usage",
      value:
        articlesLimit === -1
          ? `${articlesUsed} / Unlimited`
          : `${articlesUsed} / ${articlesLimit}`,
      icon: TrendingUp,
      color: "from-fuchsia-600 to-pink-600",
    },
    {
      label: "Plan",
      value: plan.charAt(0).toUpperCase() + plan.slice(1),
      icon: Crown,
      color: "from-amber-600 to-orange-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-gray-400">
            Welcome back! Here&apos;s your content overview.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Article
        </Button>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p
                      className={`mt-1 text-2xl font-bold text-white ${
                        stat.label === "Plan" ? getPlanColor(plan) : ""
                      }`}
                    >
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} opacity-80`}
                  >
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Usage bar */}
      {articlesLimit !== -1 && (
        <Card>
          <CardContent className="p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-300">
                Monthly Usage
              </span>
              <span className="text-sm text-gray-400">
                {articlesUsed} / {articlesLimit} articles
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(usagePercent, 100)}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`h-full rounded-full bg-gradient-to-r ${
                  usagePercent > 80
                    ? "from-red-500 to-orange-500"
                    : "from-violet-500 to-purple-500"
                }`}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent articles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-violet-400" />
              Recent Articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.recentArticles.length === 0 ? (
              <div className="flex flex-col items-center py-8 text-center">
                <FileText className="mb-3 h-10 w-10 text-gray-600" />
                <p className="text-sm text-gray-400">
                  No articles yet. Create your first one!
                </p>
                <Button size="sm" className="mt-4 gap-2">
                  <Plus className="h-4 w-4" />
                  Add Article
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {data.recentArticles.map((article) => (
                  <div
                    key={article.id}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">
                        {truncate(article.title, 40)}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {formatDate(article.created_at)}
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            article.status === "completed"
                              ? "bg-green-500/10 text-green-400"
                              : article.status === "processing"
                              ? "bg-yellow-500/10 text-yellow-400"
                              : article.status === "failed"
                              ? "bg-red-500/10 text-red-400"
                              : "bg-gray-500/10 text-gray-400"
                          }`}
                        >
                          {article.status}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-gray-500" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent generated posts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Share2 className="h-5 w-5 text-purple-400" />
              Recent Generated Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.recentPosts.length === 0 ? (
              <div className="flex flex-col items-center py-8 text-center">
                <Share2 className="mb-3 h-10 w-10 text-gray-600" />
                <p className="text-sm text-gray-400">
                  No posts generated yet. Add an article to start!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {data.recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="rounded-full bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-400">
                        {post.platform}
                      </span>
                      <span
                        className={`text-xs ${
                          post.status === "published"
                            ? "text-green-400"
                            : post.status === "scheduled"
                            ? "text-yellow-400"
                            : "text-gray-400"
                        }`}
                      >
                        {post.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {truncate(post.content, 120)}
                    </p>
                    <p className="mt-2 text-xs text-gray-600">
                      {formatDate(post.created_at)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
