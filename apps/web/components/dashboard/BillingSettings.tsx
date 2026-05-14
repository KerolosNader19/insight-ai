"use client";

import { CreditCard, Check, Zap, Shield, Crown } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Button, Card } from "@insight-ai/ui";

const PLANS = [
  {
    id: "price_starter",
    name: "Starter",
    price: "$0",
    features: ["5 Prompts/day", "Basic Analytics", "1 User"],
    icon: Zap,
    current: true,
  },
  {
    id: "price_pro",
    name: "Growth",
    price: "$149",
    features: ["50 Prompts/day", "Advanced GEO Score", "5 Users", "Priority Support"],
    icon: Shield,
    current: false,
    featured: true,
  },
  {
    id: "price_ent",
    name: "Enterprise",
    price: "Custom",
    features: ["Unlimited Prompts", "White-label Reports", "SSO", "Custom AI Models"],
    icon: Crown,
    current: false,
  },
];

export function BillingSettings() {
  const { currentOrg } = useAuthStore();

  const handleCheckout = async (priceId: string) => {
    console.log(`Redirecting to checkout for ${priceId}`);
    // In a real app, call API to get checkout URL and redirect
  };

  const handlePortal = async () => {
    console.log("Redirecting to billing portal");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Billing & Subscription</h2>
        <p className="text-foreground/40 text-sm mt-1">Manage your plan and payment methods.</p>
      </div>

      <Card className="p-6 flex items-center justify-between border-brand-accent/20 bg-brand-accent/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-accent/20 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-brand-accent" />
          </div>
          <div>
            <p className="text-sm font-medium">Current Plan: <span className="text-brand-accent font-bold">{currentOrg?.billingPlan || "Starter"}</span></p>
            <p className="text-xs text-foreground/40">Next billing date: June 12, 2026</p>
          </div>
        </div>
        <Button variant="secondary" onClick={handlePortal}>Manage in Stripe</Button>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => (
          <Card 
            key={plan.id}
            className={`p-8 flex flex-col ${plan.featured ? 'border-brand-accent shadow-[0_0_20px_-10px_rgba(0,245,212,0.5)]' : ''}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${plan.featured ? 'bg-brand-accent/20' : 'bg-brand-border/30'}`}>
                <plan.icon className={`w-5 h-5 ${plan.featured ? 'text-brand-accent' : 'text-foreground/40'}`} />
              </div>
              {plan.featured && <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">Recommended</span>}
            </div>
            
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold">{plan.price}</span>
              {plan.price !== "Custom" && <span className="text-foreground/40 text-sm">/mo</span>}
            </div>

            <ul className="mt-8 space-y-4 flex-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-foreground/60">
                  <Check className="w-4 h-4 text-brand-accent shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button 
              className="mt-8 w-full" 
              variant={plan.featured ? "primary" : "secondary"}
              disabled={plan.current}
              onClick={() => handleCheckout(plan.id)}
            >
              {plan.current ? "Current Plan" : plan.price === "Custom" ? "Contact Sales" : "Upgrade Plan"}
            </Button>
          </Card>
        ))}
      </div>

      <div className="rounded-xl border border-brand-border p-6 bg-brand-surface/20">
        <h4 className="text-sm font-bold mb-4">Payment Methods</h4>
        <div className="flex items-center justify-between p-4 rounded-lg bg-brand-primary border border-brand-border">
          <div className="flex items-center gap-4">
            <div className="w-10 h-6 bg-brand-surface rounded border border-brand-border flex items-center justify-center text-[10px] font-bold italic">VISA</div>
            <div>
              <p className="text-sm font-medium">•••• •••• •••• 4242</p>
              <p className="text-[10px] text-foreground/40">Expires 12/28</p>
            </div>
          </div>
          <button className="text-xs text-foreground/40 hover:text-foreground transition-colors">Edit</button>
        </div>
      </div>
    </div>
  );
}
