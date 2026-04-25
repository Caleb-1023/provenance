import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Opportunity",
};

export default function OpportunityDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
