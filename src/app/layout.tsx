import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";
import { MainShell } from "@/components/layout/MainShell";

export const metadata: Metadata = {
  title: "Capability Intelligence Engine",
  description: "SAM.gov opportunities matched to SBIR-funded innovators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <Providers>
          <MainShell>{children}</MainShell>
        </Providers>
      </body>
    </html>
  );
}
