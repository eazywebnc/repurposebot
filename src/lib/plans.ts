export type PlanId = "free" | "pro" | "business";

export interface PlanConfig {
  name: string;
  price: number;
  priceId?: string;
  articlesLimit: number;
  platforms: string[];
  features: string[];
}

export const PLANS: Record<PlanId, PlanConfig> = {
  free: {
    name: "Free",
    price: 0,
    articlesLimit: 5,
    platforms: ["twitter", "linkedin", "facebook"],
    features: [
      "5 articles per month",
      "3 platforms (Twitter, LinkedIn, Facebook)",
      "Basic AI generation",
      "Standard templates",
    ],
  },
  pro: {
    name: "Pro",
    price: 19,
    priceId: "price_pro_monthly",
    articlesLimit: 50,
    platforms: [
      "twitter",
      "linkedin",
      "facebook",
      "instagram",
      "threads",
      "bluesky",
      "mastodon",
    ],
    features: [
      "50 articles per month",
      "All 7 platforms",
      "Custom tone & voice",
      "Post scheduling",
      "Advanced templates",
      "Priority support",
    ],
  },
  business: {
    name: "Business",
    price: 49,
    priceId: "price_business_monthly",
    articlesLimit: -1, // unlimited
    platforms: [
      "twitter",
      "linkedin",
      "facebook",
      "instagram",
      "threads",
      "bluesky",
      "mastodon",
    ],
    features: [
      "Unlimited articles",
      "All 7 platforms",
      "REST API access",
      "Team seats (up to 5)",
      "Brand voice training",
      "Custom tone & voice",
      "Post scheduling",
      "Dedicated support",
      "Analytics dashboard",
    ],
  },
};
