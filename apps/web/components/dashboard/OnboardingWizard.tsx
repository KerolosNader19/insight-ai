"use client";

import { useState } from "react";
import { Check, ArrowRight, Building2, Target, Send } from "lucide-react";
import { Button, Card } from "@insight-ai/ui";
import { analytics } from "@/lib/analytics";

const STEPS = [
  { id: "profile", title: "Setup Profile", icon: Building2 },
  { id: "brand", title: "Add Your Brand", icon: Target },
  { id: "prompt", title: "First Prompt", icon: Send },
];

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (currentStep === STEPS.length - 1) {
      analytics.track({ name: 'onboarding_completed', properties: { time_to_complete_ms: 5000 } });
      // Redirect or close wizard
    } else {
      setCurrentStep(s => s + 1);
    }
    setIsLoading(false);
  };

  return (
    <Card className="max-w-2xl mx-auto p-12 border-brand-accent/20 bg-brand-surface/50 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-12">
        {STEPS.map((step, i) => (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className={`flex flex-col items-center gap-2 ${i <= currentStep ? 'text-brand-accent' : 'text-foreground/20'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${i < currentStep ? 'bg-brand-accent border-brand-accent' : i === currentStep ? 'border-brand-accent' : 'border-foreground/10'}`}>
                {i < currentStep ? <Check className="w-5 h-5 text-brand-primary" /> : <step.icon className="w-5 h-5" />}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">{step.title}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-[2px] mx-4 transition-colors ${i < currentStep ? 'bg-brand-accent' : 'bg-foreground/10'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
        {currentStep === 0 && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Welcome to Insight AI</h2>
            <p className="text-foreground/60 text-lg">Let's get your workspace ready for AI search visibility tracking.</p>
            <div className="space-y-4 pt-4">
              <input className="w-full bg-brand-primary border border-brand-border p-4 rounded-xl" placeholder="Organization Name" defaultValue="My Agency" />
              <input className="w-full bg-brand-primary border border-brand-border p-4 rounded-xl" placeholder="Industry" defaultValue="Tech SaaS" />
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Identify Your Brand</h2>
            <p className="text-foreground/60 text-lg">Who are we tracking? We'll use this to find mentions in ChatGPT and Perplexity.</p>
            <div className="space-y-4 pt-4">
              <input className="w-full bg-brand-primary border border-brand-border p-4 rounded-xl" placeholder="Brand Name (e.g. Stripe)" />
              <input className="w-full bg-brand-primary border border-brand-border p-4 rounded-xl" placeholder="Website URL" />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Run Your First Scan</h2>
            <p className="text-foreground/60 text-lg">Enter a common prompt customers use to find your service.</p>
            <div className="space-y-4 pt-4">
              <textarea 
                className="w-full bg-brand-primary border border-brand-border p-4 rounded-xl h-32 resize-none" 
                placeholder="e.g. What is the best payment processor for a SaaS startup?"
              />
              <div className="p-4 bg-brand-accent/10 border border-brand-accent/20 rounded-xl flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                <span className="text-xs font-medium text-brand-accent">Scan will be executed across ChatGPT, Perplexity & Gemini</span>
              </div>
            </div>
          </div>
        )}

        <div className="pt-8">
          <Button 
            className="w-full h-14 text-lg" 
            onClick={handleNext}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : currentStep === STEPS.length - 1 ? "Start Scan & Finish" : "Continue"}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
