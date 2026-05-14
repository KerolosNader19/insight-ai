"use client";

import { Zap, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";

export default function RecommendationsPage() {
  const { t } = useTranslation();
  const [resolvedIds, setResolvedIds] = useState<number[]>([]);

  const RECS = [
    {
      id: 1,
      title: "Improve Citation Authority",
      desc: "Your brand is mentioned in ChatGPT but lacks citations from high-authority tech blogs. Targeted outreach recommended.",
      impact: "High",
      engine: "ChatGPT",
    },
    {
      id: 2,
      title: "Fix Technical Jargon",
      desc: "Perplexity is summarizing your product as 'complex'. Simplify landing page copy to improve summary sentiment.",
      impact: "Medium",
      engine: "Perplexity",
    },
    {
      id: 3,
      title: "Increase News Velocity",
      desc: "Gemini hasn't updated its data on your recent launch. Submit your latest PRs to news indexers.",
      impact: "High",
      engine: "Gemini",
    },
  ];

  const handleResolve = (id: number) => {
    if (resolvedIds.includes(id)) return;
    setResolvedIds([...resolvedIds, id]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.nav.recommendations}</h1>
        <p className="text-foreground/40 text-sm mt-1">AI-powered suggestions to improve your search visibility.</p>
      </div>

      <div className="space-y-4">
        {RECS.map((rec) => {
          const isResolved = resolvedIds.includes(rec.id);
          return (
            <div 
              key={rec.id} 
              className={`p-6 rounded-2xl border transition-all duration-500 flex items-start justify-between gap-6 group ${
                isResolved 
                  ? "bg-brand-surface/10 border-brand-border/20 opacity-50 grayscale" 
                  : "border-brand-border bg-brand-surface/30 glass hover:border-brand-accent/30"
              }`}
            >
              <div className="flex gap-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isResolved ? 'bg-brand-border/20 text-foreground/20' : rec.impact === 'High' ? 'bg-brand-accent/20 text-brand-accent' : 'bg-blue-500/20 text-blue-500'
                }`}>
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`text-lg font-bold transition-all ${isResolved ? 'line-through text-foreground/40' : ''}`}>{rec.title}</h3>
                    {!isResolved && (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${rec.impact === 'High' ? 'bg-brand-accent/10 text-brand-accent' : 'bg-blue-500/10 text-blue-500'}`}>
                        {rec.impact} Impact
                      </span>
                    )}
                  </div>
                  <p className="text-foreground/60 text-sm max-w-2xl">{rec.desc}</p>
                  <div className="mt-4 flex items-center gap-4">
                    <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">Engine: {rec.engine}</span>
                    {!isResolved && (
                      <button className="text-brand-accent text-xs font-bold flex items-center gap-1 hover:underline">
                        View full guide <ArrowUpRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleResolve(rec.id)}
                disabled={isResolved}
                className={`p-3 rounded-full border transition-all ${
                  isResolved 
                    ? "bg-brand-accent/20 border-brand-accent text-brand-accent scale-90" 
                    : "border-brand-border hover:bg-brand-accent/10 hover:text-brand-accent"
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
