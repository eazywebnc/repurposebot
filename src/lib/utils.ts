import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function truncate(str: string, length: number) {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function platformIcon(platform: string): string {
  const icons: Record<string, string> = {
    twitter: "𝕏",
    linkedin: "in",
    facebook: "f",
    instagram: "📷",
    threads: "@",
    bluesky: "🦋",
    mastodon: "🐘",
  };
  return icons[platform] || platform;
}

export function getPlanColor(plan: string): string {
  switch (plan) {
    case "pro":
      return "text-violet-400";
    case "business":
      return "text-amber-400";
    default:
      return "text-gray-400";
  }
}
