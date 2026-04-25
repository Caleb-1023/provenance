import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Topic",
};

export default function TopicDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
