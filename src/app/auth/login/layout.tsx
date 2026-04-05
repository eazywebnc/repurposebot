import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | RepurposeBot",
  description: "Sign in to repurpose your content",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
