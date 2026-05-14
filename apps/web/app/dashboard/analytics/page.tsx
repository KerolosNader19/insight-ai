"use client";

import { BarChart3, TrendingUp, ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function AnalyticsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.nav.analytics}</h1>
        <p className="text-foreground/40 text-sm mt-1">Deep dive into your AI search visibility metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border border-brand-border bg-brand-surface/30 glass">
          <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-2">{t.dashboard.analytics.totalImpressions}</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold">124.8k</span>
            <span className="text-brand-accent text-xs font-bold mb-1">+12%</span>
          </div>
        </div>
        <div className="p-6 rounded-xl border border-brand-border bg-brand-surface/30 glass">
          <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-2">{t.dashboard.analytics.mentionRank}</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold">#2.4</span>
            <span className="text-brand-accent text-xs font-bold mb-1">+0.5</span>
          </div>
        </div>
        <div className="p-6 rounded-xl border border-brand-border bg-brand-surface/30 glass">
          <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-2">{t.dashboard.analytics.citationVelocity}</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold">48/day</span>
            <span className="text-brand-accent text-xs font-bold mb-1">+4%</span>
          </div>
        </div>
      </div>

      <div className="p-12 rounded-2xl border border-brand-border bg-brand-surface/20 border-dashed flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center mb-6">
          <BarChart3 className="w-8 h-8 text-brand-accent" />
        </div>
        <h3 className="text-xl font-bold mb-2">Advanced Analytics Module</h3>
        <p className="text-foreground/40 max-w-md mx-auto">
          Detailed breakdown of engine-specific visibility is being calculated. Check back in a few minutes.
        </p>
      </div>
    </div>
  );
}
