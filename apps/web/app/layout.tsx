import type { Metadata } from "next";
import { Inter, Outfit, Cairo } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" });

export const metadata: Metadata = {
  title: "Insight AI | AI Search Visibility & GEO Analytics",
  description: "Track your brand visibility across ChatGPT, Perplexity, and Gemini. Professional-grade Generative Engine Optimization (GEO) analytics.",
  keywords: ["AI SEO", "GEO Analytics", "AI Search Visibility", "Brand Tracking", "SaaS"],
  openGraph: {
    title: "Insight AI",
    description: "The platform for AI Search Visibility & GEO Analytics.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${outfit.variable} ${cairo.variable} antialiased bg-background text-foreground`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
