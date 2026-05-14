"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    description: "Perfect for exploring AI search visibility.",
    features: ["5 Tracked Prompts", "Daily Analytics", "1 Brand Profile", "Community Support"],
    cta: "Start for Free",
    featured: false,
  },
  {
    name: "Pro",
    price: "$149",
    description: "For growing brands needing deep insights.",
    features: ["50 Tracked Prompts", "Real-time Alerts", "3 Brand Profiles", "Competitor Comparison", "API Access"],
    cta: "Get Started",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large agencies and global enterprises.",
    features: ["Unlimited Prompts", "White-label Reports", "Custom Integrations", "Dedicated Account Manager", "SLA Support"],
    cta: "Contact Sales",
    featured: false,
  },
];

export function Pricing() {
  const { t } = useTranslation();
  return (
    <section id="pricing" className="py-24 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {t.pricing.title}
          </h2>
          <p className="text-foreground/60 text-lg">
            {t.pricing.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <div
              key={i}
              className={`p-8 rounded-3xl border transition-all duration-300 ${
                plan.featured
                  ? "border-brand-accent bg-brand-accent/5 scale-105 shadow-[0_0_40px_-15px_rgba(0,245,212,0.3)]"
                  : "border-brand-border bg-brand-surface/30 glass hover:border-brand-border/80"
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{i === 0 ? t.pricing.plans.starter : i === 1 ? t.pricing.plans.pro : t.pricing.plans.enterprise}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-foreground/40 ml-2">/mo</span>}
              </div>
              <p className="text-sm text-foreground/60 mb-8 min-h-[40px]">
                {plan.description}
              </p>

              <Link
                href={`/register?plan=${plan.name.toLowerCase()}`}
                className={`w-full py-4 rounded-xl font-bold mb-8 transition-all flex items-center justify-center ${
                  plan.featured
                    ? "bg-brand-accent text-brand-primary hover:brightness-110"
                    : "bg-brand-surface border border-brand-border hover:bg-brand-border/50"
                }`}
              >
                {i === 0 ? t.pricing.plans.free : i === 1 ? t.pricing.plans.getStarted : t.pricing.plans.contactSales}
              </Link>

              <ul className="space-y-4">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-foreground/70">
                    <Check className="w-4 h-4 text-brand-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
