"use client";

import { ShieldCheck, TrendingUp, ArrowUpRight, Users } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useModalStore } from "@/store/modalStore";

export default function CompetitorsPage() {
  const { t } = useTranslation();
  const { openModal } = useModalStore();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t.nav.competitors}</h1>
          <p className="text-foreground/40 text-sm mt-1">Compare your AI visibility against the market leaders.</p>
        </div>
        <button 
          onClick={() => openModal("competitor")}
          className="px-4 py-2 border border-brand-border bg-brand-surface/50 text-foreground font-bold rounded-lg text-sm flex items-center gap-2 hover:bg-brand-border/80 transition-all"
        >
          <Users className="w-4 h-4" /> Add Competitor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-2xl border border-brand-border bg-brand-surface/30 glass">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-accent" />
            Share of Voice Comparison
          </h3>
          <div className="space-y-6">
            {[
              { name: "Insight AI (You)", value: 65, color: "bg-brand-accent" },
              { name: "Competitor A", value: 45, color: "bg-blue-500" },
              { name: "Competitor B", value: 30, color: "bg-purple-500" },
            ].map((comp, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className={i === 0 ? "font-bold text-brand-accent" : "text-foreground/60"}>{comp.name}</span>
                  <span className="font-mono">{comp.value}%</span>
                </div>
                <div className="w-full h-2 bg-brand-border/30 rounded-full overflow-hidden">
                  <div className={`h-full ${comp.color} transition-all duration-1000 ease-out`} style={{ width: `${comp.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-2xl border border-brand-border bg-brand-surface/30 glass">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-accent" />
            Competitor Velocity
          </h3>
          <p className="text-foreground/40 text-sm mb-6">Tracking how fast competitors are gaining citations in AI engines.</p>
          <div className="aspect-video rounded-xl bg-brand-border/10 border border-brand-border/50 flex items-center justify-center italic text-foreground/20">
            Velocity Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}
