export interface Article {
  id: string;
  user_id: string;
  title: string;
  url: string | null;
  content: string;
  summary: string | null;
  tags: string[] | null;
  status: "pending" | "processing" | "completed" | "failed";
  created_at: string;
  updated_at: string;
}

export interface GeneratedPost {
  id: string;
  user_id: string;
  article_id: string;
  platform: Platform;
  content: string;
  tone: string;
  hashtags: string[] | null;
  media_suggestions: string | null;
  scheduled_at: string | null;
  published_at: string | null;
  status: "draft" | "scheduled" | "published" | "failed";
  engagement_score: number | null;
  created_at: string;
  updated_at: string;
}

export interface Template {
  id: string;
  user_id: string | null;
  name: string;
  platform: Platform;
  template_text: string;
  tone: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface Settings {
  id: string;
  user_id: string;
  plan: "free" | "pro" | "business";
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  default_tone: string;
  brand_voice: string | null;
  platforms: string[];
  articles_used: number;
  articles_limit: number;
  created_at: string;
  updated_at: string;
}

export type Platform =
  | "twitter"
  | "linkedin"
  | "facebook"
  | "instagram"
  | "threads"
  | "bluesky"
  | "mastodon";

export interface DashboardStats {
  totalArticles: number;
  totalPosts: number;
  articlesThisMonth: number;
  articlesLimit: number;
  plan: string;
}
